import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { Loader2, Trash } from 'lucide-react';

// Types pour les Guides et Outils
interface Guide {
  id: string;
  title: string;
  description: string;
  file_url: string;
  is_premium: boolean;
  created_at: string;
}

interface Tool {
  id: string;
  name: string;
  description: string;
  download_url: string;
  is_premium: boolean;
  created_at: string;
}

const Admin = () => {
  const { toast } = useToast();
  const [guides, setGuides] = useState<Guide[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(false);

  // --- Fonctions de récupération ---
  const fetchGuides = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('guides').select('*').order('created_at', { ascending: false });
    if (error) {
      toast({
        title: 'Erreur',
        description: 'Échec du chargement des guides : ' + error.message,
        variant: 'destructive',
      });
    } else {
      setGuides(data as Guide[]);
    }
    setLoading(false);
  };

  const fetchTools = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('tools').select('*').order('created_at', { ascending: false });
    if (error) {
      toast({
        title: 'Erreur',
        description: 'Échec du chargement des outils : ' + error.message,
        variant: 'destructive',
      });
    } else {
      setTools(data as Tool[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGuides();
    fetchTools();
  }, []);

  // --- Fonctions de soumission pour Ajout (existantes, légèrement modifiées pour rafraîchir les listes) ---
  const handleGuideSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const title = (form.elements.namedItem('guideTitle') as HTMLInputElement).value;
    const description = (form.elements.namedItem('guideDescription') as HTMLTextAreaElement).value;
    const fileInput = (form.elements.namedItem('guideFile') as HTMLInputElement);
    const file = fileInput.files?.[0];
    const isPremium = (form.elements.namedItem('guideIsPremium') as HTMLInputElement).checked;

    if (!title || !file) {
      toast({
        title: 'Erreur',
        description: 'Le titre et le fichier du guide sont obligatoires.',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    const filePath = `public/${Date.now()}-${file.name}`; // Ajouter 'public/' ou un préfixe
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('guides-files')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      toast({
        title: 'Erreur de téléversement',
        description: uploadError.message,
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    const fileUrl = supabase.storage.from('guides-files').getPublicUrl(uploadData.path).data.publicUrl;

    const { error: insertError } = await supabase
      .from('guides')
      .insert([
        {
          title,
          description,
          file_url: fileUrl,
          is_premium: isPremium,
        },
      ]);

    if (insertError) {
      // Tenter de supprimer le fichier téléversé si l'insertion DB échoue
      await supabase.storage.from('guides-files').remove([uploadData.path]);
      toast({
        title: 'Erreur d\'ajout de guide',
        description: insertError.message,
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    toast({
      title: 'Succès',
      description: 'Le guide a été ajouté avec succès.',
    });
    form.reset();
    fileInput.value = ''; // Réinitialiser le champ de fichier
    fetchGuides(); // Rafraîchir la liste
    setLoading(false);
  };

  const handleToolSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const name = (form.elements.namedItem('toolName') as HTMLInputElement).value;
    const description = (form.elements.namedItem('toolDescription') as HTMLTextAreaElement).value;
    const fileInput = (form.elements.namedItem('toolFile') as HTMLInputElement);
    const file = fileInput.files?.[0];
    const isPremium = (form.elements.namedItem('toolIsPremium') as HTMLInputElement).checked;

    if (!name || !file) {
      toast({
        title: 'Erreur',
        description: 'Le nom et le fichier de l\'outil sont obligatoires.',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    const filePath = `public/${Date.now()}-${file.name}`; // Ajouter 'public/' ou un préfixe
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('tools-files')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      toast({
        title: 'Erreur de téléversement',
        description: uploadError.message,
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    const fileUrl = supabase.storage.from('tools-files').getPublicUrl(uploadData.path).data.publicUrl;

    const { error: insertError } = await supabase
      .from('tools')
      .insert([
        {
          name,
          description,
          download_url: fileUrl,
          is_premium: isPremium,
        },
      ]);

    if (insertError) {
      // Tenter de supprimer le fichier téléversé si l'insertion DB échoue
      await supabase.storage.from('tools-files').remove([uploadData.path]);
      toast({
        title: 'Erreur d\'ajout d\'outil',
        description: insertError.message,
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    toast({
      title: 'Succès',
      description: 'L\'outil a été ajouté avec succès.',
    });
    form.reset();
    fileInput.value = ''; // Réinitialiser le champ de fichier
    fetchTools(); // Rafraîchir la liste
    setLoading(false);
  };

  // --- Fonctions de suppression ---
  const handleDeleteGuide = async (guideId: string, filePath: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce guide ?')) return;
    setLoading(true);

    // Extraire le chemin relatif du fichier pour Supabase Storage
    const pathSegments = filePath.split('/');
    // Le chemin est souvent après 'public' ou le nom du bucket dans l'URL publique
    const fileName = pathSegments[pathSegments.length - 1]; // Ou adapter selon votre structure d'URL exacte
    const storagePath = `public/${fileName}`; // Assurez-vous que c'est le bon chemin dans le bucket

    // 1. Supprimer le fichier du Storage
    const { error: storageError } = await supabase.storage.from('guides-files').remove([storagePath]);

    if (storageError) {
      toast({
        title: 'Erreur de suppression du fichier',
        description: storageError.message,
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    // 2. Supprimer l'entrée de la base de données
    const { error: dbError } = await supabase.from('guides').delete().eq('id', guideId);

    if (dbError) {
      toast({
        title: 'Erreur de suppression du guide',
        description: dbError.message,
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    toast({
      title: 'Succès',
      description: 'Le guide a été supprimé avec succès.',
    });
    fetchGuides(); // Rafraîchir la liste
    setLoading(false);
  };

  const handleDeleteTool = async (toolId: string, filePath: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet outil ?')) return;
    setLoading(true);

    // Extraire le chemin relatif du fichier pour Supabase Storage
    const pathSegments = filePath.split('/');
    const fileName = pathSegments[pathSegments.length - 1];
    const storagePath = `public/${fileName}`;

    // 1. Supprimer le fichier du Storage
    const { error: storageError } = await supabase.storage.from('tools-files').remove([storagePath]);

    if (storageError) {
      toast({
        title: 'Erreur de suppression du fichier',
        description: storageError.message,
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    // 2. Supprimer l'entrée de la base de données
    const { error: dbError } = await supabase.from('tools').delete().eq('id', toolId);

    if (dbError) {
      toast({
        title: 'Erreur de suppression de l\'outil',
        description: dbError.message,
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    toast({
      title: 'Succès',
      description: 'L\'outil a été supprimé avec succès.',
    });
    fetchTools(); // Rafraîchir la liste
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Tableau de Bord Administrateur</h1>

      <Tabs defaultValue="guides" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="guides">Gérer les Guides</TabsTrigger>
          <TabsTrigger value="tools">Gérer les Outils</TabsTrigger>
        </TabsList>
        <TabsContent value="guides" className="p-4 border rounded-md mt-4">
          <h2 className="text-2xl font-semibold mb-4">Ajouter un nouveau Guide</h2>
          <form onSubmit={handleGuideSubmit} className="space-y-4">
            <div>
              <Label htmlFor="guideTitle">Titre du Guide</Label>
              <Input id="guideTitle" name="guideTitle" placeholder="Ex: Guide de sécurisation de réseau" required />
            </div>
            <div>
              <Label htmlFor="guideDescription">Description</Label>
              <Textarea id="guideDescription" name="guideDescription" placeholder="Description détaillée du guide..." />
            </div>
            <div>
              <Label htmlFor="guideFile">Fichier du Guide (PDF, etc.)</Label>
              <Input id="guideFile" name="guideFile" type="file" required accept=".pdf,.doc,.docx" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="guideIsPremium" name="guideIsPremium" />
              <Label htmlFor="guideIsPremium">Contenu Premium</Label>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Ajouter Guide
            </Button>
          </form>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Guides Existants</h2>
          {loading && <p>Chargement des guides...</p>}
          {!loading && guides.length === 0 && <p>Aucun guide ajouté pour le moment.</p>}
          <div className="space-y-4">
            {guides.map((guide) => (
              <div key={guide.id} className="p-4 border rounded-md flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{guide.title} {guide.is_premium && <span className="text-sm text-yellow-500">(Premium)</span>}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{guide.description}</p>
                  <a href={guide.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">Voir le fichier</a>
                </div>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteGuide(guide.id, guide.file_url)} disabled={loading}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tools" className="p-4 border rounded-md mt-4">
          <h2 className="text-2xl font-semibold mb-4">Ajouter un nouvel Outil</h2>
          <form onSubmit={handleToolSubmit} className="space-y-4">
            <div>
              <Label htmlFor="toolName">Nom de l\'Outil</Label>
              <Input id="toolName" name="toolName" placeholder="Ex: Scanner de vulnérabilités" required />
            </div>
            <div>
              <Label htmlFor="toolDescription">Description</Label>
              <Textarea id="toolDescription" name="toolDescription" placeholder="Description détaillée de l\'outil..." />
            </div>
            <div>
              <Label htmlFor="toolFile">Fichier de l\'Outil (EXE, ZIP, etc.)</Label>
              <Input id="toolFile" name="toolFile" type="file" required />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="toolIsPremium" name="toolIsPremium" />
              <Label htmlFor="toolIsPremium">Contenu Premium</Label>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Ajouter Outil
            </Button>
          </form>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Outils Existants</h2>
          {loading && <p>Chargement des outils...</p>}
          {!loading && tools.length === 0 && <p>Aucun outil ajouté pour le moment.</p>}
          <div className="space-y-4">
            {tools.map((tool) => (
              <div key={tool.id} className="p-4 border rounded-md flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{tool.name} {tool.is_premium && <span className="text-sm text-yellow-500">(Premium)</span>}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>
                  <a href={tool.download_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">Télécharger</a>
                </div>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteTool(tool.id, tool.download_url)} disabled={loading}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;