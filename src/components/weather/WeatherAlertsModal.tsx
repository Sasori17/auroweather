'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Info, AlertOctagon, CheckCircle, ExternalLink } from 'lucide-react';
import type { WeatherAlert, AlertLevel } from '@/types/weather';

interface WeatherAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: WeatherAlert[];
  cityName: string;
  country: string;
}

function getAlertColor(level: AlertLevel) {
  switch (level) {
    case 'Rouge':
      return 'from-red-500 to-red-600';
    case 'Orange':
      return 'from-orange-500 to-orange-600';
    case 'Jaune':
      return 'from-yellow-500 to-yellow-600';
    default:
      return 'from-green-500 to-green-600';
  }
}

function getAlertIcon(level: AlertLevel) {
  switch (level) {
    case 'Rouge':
      return <AlertOctagon className="w-6 h-6" />;
    case 'Orange':
      return <AlertTriangle className="w-6 h-6" />;
    case 'Jaune':
      return <Info className="w-6 h-6" />;
    default:
      return <CheckCircle className="w-6 h-6" />;
  }
}

function getAlertLevelText(level: AlertLevel) {
  switch (level) {
    case 'Rouge':
      return 'Vigilance Rouge - Danger extrême';
    case 'Orange':
      return 'Vigilance Orange - Phénomènes dangereux';
    case 'Jaune':
      return 'Vigilance Jaune - À surveiller';
    default:
      return 'Pas de vigilance particulière';
  }
}

export function WeatherAlertsModal({ isOpen, onClose, alerts, cityName, country }: WeatherAlertsModalProps) {
  // Déterminer le niveau d'alerte le plus élevé
  const getMaxAlertLevel = (): AlertLevel => {
    if (alerts.length === 0) return 'Vert';
    const levels = ['Vert', 'Jaune', 'Orange', 'Rouge'];
    let maxLevel = 'Vert';
    alerts.forEach(alert => {
      if (levels.indexOf(alert.level) > levels.indexOf(maxLevel)) {
        maxLevel = alert.level;
      }
    });
    return maxLevel as AlertLevel;
  };

  const maxLevel = getMaxAlertLevel();
  const vigilanceUrl = country === 'FR'
    ? 'https://vigilance.meteofrance.fr/fr'
    : `https://www.google.com/search?q=weather+alerts+${cityName}+${country}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="modern-card rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${getAlertColor(maxLevel)} p-6 text-white`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {getAlertIcon(maxLevel)}
                    <h2 className="text-2xl font-bold">Vigilance Météo</h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-white/90">
                  {cityName}, {country}
                </p>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-250px)] custom-scrollbar">
                {alerts.length === 0 || maxLevel === 'Vert' ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Aucune alerte en cours
                    </h3>
                    <p className="text-white/60">
                      Il n'y a actuellement aucune vigilance météorologique pour cette région.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Niveau d'alerte principal */}
                    <div className={`bg-gradient-to-r ${getAlertColor(maxLevel)} p-4 rounded-xl text-white`}>
                      <h3 className="text-lg font-bold mb-1">
                        {getAlertLevelText(maxLevel)}
                      </h3>
                      <p className="text-sm text-white/90">
                        {alerts.length} {alerts.length > 1 ? 'alertes actives' : 'alerte active'}
                      </p>
                    </div>

                    {/* Liste des alertes */}
                    {alerts.map((alert, index) => (
                      <motion.div
                        key={`${alert.departmentCode}-${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="modern-cardp-4 rounded-xl"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`bg-gradient-to-r ${getAlertColor(alert.level)} p-2 rounded-lg`}>
                            {getAlertIcon(alert.level)}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-lg">
                              {alert.department}
                            </h4>
                            <p className="text-white/60 text-sm">
                              {alert.departmentCode}
                            </p>
                          </div>
                        </div>

                        {alert.alertTypes.length > 0 && (
                          <div className="mb-3">
                            <p className="text-white/70 text-sm mb-2">Types d'alerte :</p>
                            <div className="flex flex-wrap gap-2">
                              {alert.alertTypes.map((type, i) => (
                                <span
                                  key={i}
                                  className="modern-cardpx-3 py-1 rounded-full text-white text-xs"
                                >
                                  {type}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {alert.description && (
                          <div className="mb-3">
                            <p className="text-white/70 text-sm mb-1">Description :</p>
                            <p className="text-white/90 text-sm">{alert.description}</p>
                          </div>
                        )}

                        {alert.consequences && (
                          <div className="mb-3">
                            <p className="text-white/70 text-sm mb-1">Conséquences :</p>
                            <p className="text-white/90 text-sm">{alert.consequences}</p>
                          </div>
                        )}

                        {alert.advice && (
                          <div className="mb-3">
                            <p className="text-white/70 text-sm mb-1">Conseils :</p>
                            <p className="text-white/90 text-sm">{alert.advice}</p>
                          </div>
                        )}

                        <div className="text-white/50 text-xs">
                          <p>Début : {new Date(alert.startTime).toLocaleString('fr-FR')}</p>
                          <p>Fin prévue : {new Date(alert.endTime).toLocaleString('fr-FR')}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-white/10">
                <a
                  href={vigilanceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full glass px-6 py-3 rounded-full text-white hover:bg-white/20 transition-colors"
                >
                  <span>Voir plus de détails</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                {country === 'FR' && (
                  <p className="text-center text-white/50 text-xs mt-3">
                    Source : Météo-France - Vigilance Météorologique
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
