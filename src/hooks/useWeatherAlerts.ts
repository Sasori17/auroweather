'use client';

import { useState, useCallback } from 'react';
import type { WeatherAlert, AlertLevel } from '@/types/weather';

interface MeteoFranceApiResponse {
  records: Array<{
    fields: {
      nom_dept?: string;
      code_dept?: string;
      vig_niveau?: string;
      vig_risque?: string;
      date_insert?: string;
      date_prevue?: string;
    };
  }>;
}

export function useWeatherAlerts() {
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAlertsByDepartment = useCallback(async (lat: number, lon: number, cityName: string) => {
    setLoading(true);
    setError(null);

    try {
      // Tentative de récupération des alertes via l'API Météo-France publique
      // Note: Cette API est limitée à la France métropolitaine
      const response = await fetch(
        `https://public.opendatasoft.com/api/records/1.0/search/?dataset=risques-meteorologiques-copy&q=&facet=etat_vent&facet=etat_pluie_inondation&facet=etat_orage&facet=etat_inondation&facet=etat_neige&facet=etat_canicule&facet=etat_grand_froid&facet=etat_avalanches`
      );

      if (!response.ok) {
        throw new Error('Impossible de récupérer les alertes météo');
      }

      const data: MeteoFranceApiResponse = await response.json();

      // Pour une meilleure expérience, nous allons créer une alerte générique basée sur les conditions actuelles
      // En production, vous devriez mapper les départements français avec les coordonnées GPS
      const simulatedAlerts: WeatherAlert[] = [];

      // Vérifier si nous sommes en France (approximatif)
      const isInFrance = lat >= 41 && lat <= 51 && lon >= -5 && lon <= 10;

      if (isInFrance && data.records && data.records.length > 0) {
        // Mapper les alertes de l'API
        const alertsMap = new Map<string, WeatherAlert>();

        data.records.forEach((record) => {
          const fields = record.fields;
          if (!fields.nom_dept || !fields.code_dept) return;

          const key = fields.code_dept;
          if (!alertsMap.has(key)) {
            alertsMap.set(key, {
              department: fields.nom_dept,
              departmentCode: fields.code_dept,
              level: (fields.vig_niveau as AlertLevel) || 'Vert',
              alertTypes: [],
              startTime: fields.date_insert || new Date().toISOString(),
              endTime: fields.date_prevue || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            });
          }

          const alert = alertsMap.get(key)!;
          if (fields.vig_risque && !alert.alertTypes.includes(fields.vig_risque)) {
            alert.alertTypes.push(fields.vig_risque);
          }
        });

        simulatedAlerts.push(...Array.from(alertsMap.values()));
      }

      setAlerts(simulatedAlerts);
    } catch (err) {
      console.error('Erreur lors de la récupération des alertes:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getAlertLevel = useCallback(() => {
    if (alerts.length === 0) return 'Vert';

    const levels = ['Vert', 'Jaune', 'Orange', 'Rouge'];
    let maxLevel = 'Vert';

    alerts.forEach(alert => {
      if (levels.indexOf(alert.level) > levels.indexOf(maxLevel)) {
        maxLevel = alert.level;
      }
    });

    return maxLevel as AlertLevel;
  }, [alerts]);

  const hasAlerts = useCallback(() => {
    return alerts.length > 0 && getAlertLevel() !== 'Vert';
  }, [alerts, getAlertLevel]);

  return {
    alerts,
    loading,
    error,
    fetchAlertsByDepartment,
    getAlertLevel,
    hasAlerts,
  };
}
