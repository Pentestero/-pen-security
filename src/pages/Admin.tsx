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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Types
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

interface Threat {
  id: string;
  city: string;
  latitude: number;
  longitude: number;
  type: string;
  count: number;
  created_at: string;
}

const threatTypes = ["phishing", "malware", "ransomware", "ddos"];

const Admin = () => {
  const { toast } = useToast();
  const [guides, setGuides] = useState<Guide[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [threats, setThreats] = useState<Threat[]>([]);
  const [loading, setLoading] = useState(false);

  // --- Fonctions de récupération ---
  const fetchGuides = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('guides').select('*').order('created_at', { ascending: false });
    if (error) {
      toast({ title: 'Erreur', description: 'Échec du chargement des guides : ' + error.message, variant: 'destructive' });
    } else {
      setGuides(data as Guide[]);
    }
    setLoading(false);
  };
  const fetchTools = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('tools').select('*').order('created_at', { ascending: false });
    if (error) {
      toast({ title: 'Erreur', description: 'Échec du chargement des outils : ' + error.message, variant: 'destructive' });
    } else {
      setTools(data as Tool[]);
    }
    setLoading(false);
  };
  const fetchThreats = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('threats').select('*').order('created_at', { ascending: false });
    if (error) {
      toast({ title: 'Erreur', description: 'Échec du chargement des menaces : ' + error.message, variant: 'destructive' });
    } else {
      setThreats(data as Threat[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGuides();
    fetchTools();
    fetchThreats();
  }, []);

  // --- Fonctions de soumission ---
  const handleGuideSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const title = (form.elements.namedItem('guideTitle') as HTMLInputElement).value;
    const description = (form.elements.namedItem('guideDescription') as HTMLTextAreaElement).value;
    const fileInput = form.elements.namedItem('guideFile') as HTMLInputElement;
    const isPremium = (form.elements.namedItem('guideIsPremium') as HTMLInputElement).checked;

    if (!title || !description || !fileInput.files || fileInput.files.length === 0) {
      toast({ title: 'Erreur', description: 'Veuillez remplir tous les champs et sélectionner un fichier.', variant: 'destructive' });
      setLoading(false);
      return;
    }

    const file = fileInput.files[0];
    const filePath = `public/${file.name}`; // Store in a public folder in the bucket

    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage.from('guides-files').upload(filePath, file);

    if (uploadError) {
      toast({ title: 'Erreur', description: 'Échec de l\'upload du fichier : ' + uploadError.message, variant: 'destructive' });
      setLoading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage.from('guides-files').getPublicUrl(filePath);
    const file_url = publicUrlData?.publicUrl || '';

    // Insert guide data into Supabase
    const { error: insertError } = await supabase.from('guides').insert([{ title, description, file_url, is_premium: isPremium }]);

    if (insertError) {
      toast({ title: 'Erreur', description: 'Échec de l\'ajout du guide : ' + insertError.message, variant: 'destructive' });
      setLoading(false);
      return;
    }

    toast({ title: 'Succès', description: 'Le guide a été ajouté.' });
    form.reset();
    fetchGuides();
    setLoading(false);
  };
  const handleToolSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const name = (form.elements.namedItem('toolName') as HTMLInputElement).value;
    const description = (form.elements.namedItem('toolDescription') as HTMLTextAreaElement).value;
    const fileInput = form.elements.namedItem('toolFile') as HTMLInputElement;
    const isPremium = (form.elements.namedItem('toolIsPremium') as HTMLInputElement).checked;

    if (!name || !description || !fileInput.files || fileInput.files.length === 0) {
      toast({ title: 'Erreur', description: 'Veuillez remplir tous les champs et sélectionner un fichier.', variant: 'destructive' });
      setLoading(false);
      return;
    }

    const file = fileInput.files[0];
    const filePath = `public/${file.name}`; // Store in a public folder in the bucket

    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage.from('tools-files').upload(filePath, file);

    if (uploadError) {
      toast({ title: 'Erreur', description: 'Échec de l\'upload du fichier : ' + uploadError.message, variant: 'destructive' });
      setLoading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage.from('tools-files').getPublicUrl(filePath);
    const download_url = publicUrlData?.publicUrl || '';

    // Insert tool data into Supabase
    const { error: insertError } = await supabase.from('tools').insert([{ name, description, download_url, is_premium: isPremium }]);

    if (insertError) {
      toast({ title: 'Erreur', description: 'Échec de l\'ajout de l\'outil : ' + insertError.message, variant: 'destructive' });
      setLoading(false);
      return;
    }

    toast({ title: 'Succès', description: 'L\'outil a été ajouté.' });
    form.reset();
    fetchTools();
    setLoading(false);
  };
  const handleThreatSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const city = (form.elements.namedItem('threatCity') as HTMLInputElement).value;
    const latitude = parseFloat((form.elements.namedItem('threatLat') as HTMLInputElement).value);
    const longitude = parseFloat((form.elements.namedItem('threatLon') as HTMLInputElement).value);
    const type = (form.elements.namedItem('threatType') as HTMLInputElement).value;
    const count = parseInt((form.elements.namedItem('threatCount') as HTMLInputElement).value, 10);

    if (!city || !type || isNaN(latitude) || isNaN(longitude) || isNaN(count)) {
      toast({ title: 'Erreur', description: 'Veuillez remplir tous les champs correctement.', variant: 'destructive' });
      setLoading(false);
      return;
    }

    const { error } = await supabase.from('threats').insert([{ city, latitude, longitude, type, count }]);
    if (error) {
      toast({ title: 'Erreur', description: 'Échec de l\'ajout de la menace : ' + error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Succès', description: 'La menace a été ajoutée.' });
      form.reset();
      fetchThreats();
    }
    setLoading(false);
  };

  // --- Fonctions de suppression ---
  const handleDeleteGuide = async (guideId: string, filePath: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce guide ?')) return;
    setLoading(true);

    // Delete file from Supabase Storage
    const fileName = filePath.split('/').pop();
    if (fileName) {
      const { error: deleteFileError } = await supabase.storage.from('guides-files').remove([`public/${fileName}`]);
      if (deleteFileError) {
        toast({ title: 'Erreur', description: 'Échec de la suppression du fichier du guide : ' + deleteFileError.message, variant: 'destructive' });
        setLoading(false);
        return;
      }
    }

    // Delete guide data from Supabase
    const { error: deleteError } = await supabase.from('guides').delete().eq('id', guideId);
    if (deleteError) {
      toast({ title: 'Erreur', description: 'Échec de la suppression du guide : ' + deleteError.message, variant: 'destructive' });
    } else {
      toast({ title: 'Succès', description: 'Le guide a été supprimé.' });
      fetchGuides();
    }
    setLoading(false);
  };
  const handleDeleteTool = async (toolId: string, filePath: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet outil ?')) return;
    setLoading(true);

    // Delete file from Supabase Storage
    const fileName = filePath.split('/').pop();
    if (fileName) {
      const { error: deleteFileError } = await supabase.storage.from('tools-files').remove([`public/${fileName}`]);
      if (deleteFileError) {
        toast({ title: 'Erreur', description: 'Échec de la suppression du fichier de l\'outil : ' + deleteFileError.message, variant: 'destructive' });
        setLoading(false);
        return;
      }
    }

    // Delete tool data from Supabase
    const { error: deleteError } = await supabase.from('tools').delete().eq('id', toolId);
    if (deleteError) {
      toast({ title: 'Erreur', description: 'Échec de la suppression de l\'outil : ' + deleteError.message, variant: 'destructive' });
    } else {
      toast({ title: 'Succès', description: 'L\'outil a été supprimé.' });
      fetchTools();
    }
    setLoading(false);
  };
  const handleDeleteThreat = async (threatId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette menace ?')) return;
    setLoading(true);
    const { error } = await supabase.from('threats').delete().eq('id', threatId);
    if (error) {
      toast({ title: 'Erreur', description: 'Échec de la suppression de la menace : ' + error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Succès', description: 'La menace a été supprimée.' });
      fetchThreats();
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Tableau de Bord Administrateur</h1>

      <Tabs defaultValue="guides" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="guides">Gérer les Guides</TabsTrigger>
          <TabsTrigger value="tools">Gérer les Outils</TabsTrigger>
          <TabsTrigger value="threats">Gérer les Menaces</TabsTrigger>
        </TabsList>

        <TabsContent value="guides" className="p-4 border rounded-md mt-4">
          <h2 className="text-2xl font-semibold mb-4">Ajouter un nouveau Guide</h2>
          <form onSubmit={handleGuideSubmit} className="space-y-4 max-w-lg">
            <div>
              <Label htmlFor="guideTitle">Titre</Label>
              <Input id="guideTitle" name="guideTitle" placeholder="Ex: Guide de Sécurité des Mots de Passe" required />
            </div>
            <div>
              <Label htmlFor="guideDescription">Description</Label>
              <Textarea id="guideDescription" name="guideDescription" placeholder="Description du guide..." required />
            </div>
            <div>
              <Label htmlFor="guideFile">Fichier du Guide (PDF, DOCX, etc.)</Label>
              <Input id="guideFile" name="guideFile" type="file" required />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="guideIsPremium" name="guideIsPremium" />
              <Label htmlFor="guideIsPremium">Premium</Label>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Ajouter Guide
            </Button>
          </form>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Guides Actifs</h2>
          {loading && <p>Chargement des guides...</p>}
          {!loading && guides.length === 0 && <p>Aucun guide ajouté pour le moment.</p>}
          <div className="space-y-4">
            {guides.map((guide) => (
              <div key={guide.id} className="p-4 border rounded-md flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{guide.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{guide.description}</p>
                  <a href={guide.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-xs hover:underline">
                    Voir le fichier
                  </a>
                  <p className="text-xs text-muted-foreground">Premium: {guide.is_premium ? 'Oui' : 'Non'}</p>
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
          <form onSubmit={handleToolSubmit} className="space-y-4 max-w-lg">
            <div>
              <Label htmlFor="toolName">Nom de l'Outil</Label>
              <Input id="toolName" name="toolName" placeholder="Ex: VPN Checker" required />
            </div>
            <div>
              <Label htmlFor="toolDescription">Description</Label>
              <Textarea id="toolDescription" name="toolDescription" placeholder="Description de l'outil..." required />
            </div>
            <div>
              <Label htmlFor="toolFile">Fichier de l'Outil (EXE, ZIP, etc.)</Label>
              <Input id="toolFile" name="toolFile" type="file" required />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="toolIsPremium" name="toolIsPremium" />
              <Label htmlFor="toolIsPremium">Premium</Label>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Ajouter Outil
            </Button>
          </form>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Outils Actifs</h2>
          {loading && <p>Chargement des outils...</p>}
          {!loading && tools.length === 0 && <p>Aucun outil ajouté pour le moment.</p>}
          <div className="space-y-4">
            {tools.map((tool) => (
              <div key={tool.id} className="p-4 border rounded-md flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{tool.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>
                  <a href={tool.download_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-xs hover:underline">
                    Télécharger
                  </a>
                  <p className="text-xs text-muted-foreground">Premium: {tool.is_premium ? 'Oui' : 'Non'}</p>
                </div>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteTool(tool.id, tool.download_url)} disabled={loading}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        
        <TabsContent value="threats" className="p-4 border rounded-md mt-4">
          <h2 className="text-2xl font-semibold mb-4">Ajouter une nouvelle Menace</h2>
          <form onSubmit={handleThreatSubmit} className="space-y-4 max-w-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="threatCity">Ville</Label>
                <Input id="threatCity" name="threatCity" placeholder="Ex: Douala" required />
              </div>
              <div>
                <Label htmlFor="threatType">Type de menace</Label>
                <select id="threatType" name="threatType" required className="w-full h-10 border rounded-md px-3">
                  {threatTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="threatLat">Latitude</Label>
                <Input id="threatLat" name="threatLat" type="number" step="any" placeholder="Ex: 4.05" required />
              </div>
              <div>
                <Label htmlFor="threatLon">Longitude</Label>
                <Input id="threatLon" name="threatLon" type="number" step="any" placeholder="Ex: 9.70" required />
              </div>
            </div>
            <div>
              <Label htmlFor="threatCount">Nombre de détections</Label>
              <Input id="threatCount" name="threatCount" type="number" placeholder="Ex: 23" required />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Ajouter Menace
            </Button>
          </form>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Menaces Actives</h2>
          {loading && <p>Chargement des menaces...</p>}
          {!loading && threats.length === 0 && <p>Aucune menace ajoutée pour le moment.</p>}
          <div className="space-y-4">
            {threats.map((threat) => (
              <div key={threat.id} className="p-4 border rounded-md flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{threat.city}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Type: {threat.type}, Détections: {threat.count}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Lat: {threat.latitude}, Lon: {threat.longitude}
                  </p>
                </div>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteThreat(threat.id)} disabled={loading}>
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
