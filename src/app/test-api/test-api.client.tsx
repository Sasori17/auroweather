'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export default function TestAPIClientPage() {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; data?: Record<string, string> } | null>(null);

  const testAPI = async () => {
    setTesting(true);
    setResult(null);

    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

    if (!apiKey) {
      setResult({
        success: false,
        message: 'Clé API manquante dans .env.local',
      });
      setTesting(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${apiKey}&units=metric`
      );

      if (response.ok) {
        const data = await response.json();
        setResult({
          success: true,
          message: 'Clé API valide et fonctionnelle !',
          data: {
            ville: data.name,
            temperature: `${Math.round(data.main.temp)}°C`,
            description: data.weather[0].description,
          },
        });
      } else {
        const errorData = await response.json();
        let message = '';

        if (response.status === 401) {
          message = `Clé API invalide ou non activée (Erreur 401).

Les nouvelles clés OpenWeatherMap peuvent prendre jusqu'à 2 heures pour être activées.

Vérifiez :
1. Que vous avez créé un compte sur https://openweathermap.org
2. Que vous avez généré une clé API
3. Que vous avez copié la bonne clé dans .env.local
4. Attendez quelques heures si la clé vient d'être créée

Détails : ${errorData.message || 'Unauthorized'}`;
        } else {
          message = `Erreur ${response.status}: ${errorData.message || 'Erreur inconnue'}`;
        }

        setResult({
          success: false,
          message,
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: `Erreur réseau: ${error instanceof Error ? error.message : 'Impossible de contacter l\'API'}`,
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Test de la clé API OpenWeatherMap</CardTitle>
          <CardDescription>
            Testez si votre clé API est correctement configurée et activée
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Clé API actuelle : <code className="bg-muted px-2 py-1 rounded text-xs">
                {process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
                  ? `${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY.substring(0, 8)}...`
                  : 'Non configurée'}
              </code>
            </p>
          </div>

          <Button
            onClick={testAPI}
            disabled={testing}
            className="w-full"
          >
            {testing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Test en cours...
              </>
            ) : (
              'Tester la clé API'
            )}
          </Button>

          {result && (
            <Alert variant={result.success ? 'default' : 'destructive'}>
              {result.success ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <AlertTitle>{result.success ? 'Succès' : 'Échec'}</AlertTitle>
              <AlertDescription className="whitespace-pre-line">
                {result.message}
                {result.data && (
                  <div className="mt-4 p-3 bg-muted rounded-md">
                    <p className="font-semibold">Données reçues :</p>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>Ville : {result.data.ville}</li>
                      <li>Température : {result.data.temperature}</li>
                      <li>Description : {result.data.description}</li>
                    </ul>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}

          <div className="mt-6 p-4 bg-muted rounded-lg space-y-3">
            <h3 className="font-semibold">Instructions :</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Créez un compte gratuit sur <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">openweathermap.org</a></li>
              <li>Générez une clé API dans votre profil</li>
              <li>Ajoutez la clé dans le fichier .env.local à la racine du projet</li>
              <li>Redémarrez le serveur de développement (npm run dev)</li>
              <li>Attendez jusqu&apos;à 2 heures si la clé vient d&apos;être créée</li>
            </ol>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" asChild className="flex-1">
              <Link href="/">Retour à l&apos;accueil</Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer">
                Obtenir une clé API
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
