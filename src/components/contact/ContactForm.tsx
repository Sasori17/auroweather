'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2, Shield } from 'lucide-react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    // Honeypot field - should remain empty
    website: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setErrorMessage('');

    try {
      // Check honeypot - if filled, it's a bot
      if (formData.website) {
        console.log('Bot detected - honeypot filled');
        // Fake success to not reveal the honeypot
        setFormState('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          website: '',
        });
        return;
      }

      // Get reCAPTCHA token
      let recaptchaToken = '';
      if (executeRecaptcha) {
        try {
          recaptchaToken = await executeRecaptcha('contact_form');
        } catch (error) {
          console.warn('reCAPTCHA execution failed:', error);
          // Continue without reCAPTCHA if it fails
        }
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'envoi du message');
      }

      setFormState('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        website: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormState('idle');
      }, 5000);
    } catch (error) {
      setFormState('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Une erreur est survenue'
      );

      // Reset error message after 5 seconds
      setTimeout(() => {
        setFormState('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot field - hidden from users, visible to bots */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website (leave blank)</label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Name and Email */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-white font-medium mb-2">
              Nom complet <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20 focus:outline-none focus:border-blue-400/50 transition-colors placeholder:text-white/40"
              placeholder="Jean Dupont"
              disabled={formState === 'loading'}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-white font-medium mb-2">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20 focus:outline-none focus:border-blue-400/50 transition-colors placeholder:text-white/40"
              placeholder="jean.dupont@exemple.com"
              disabled={formState === 'loading'}
            />
          </div>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-white font-medium mb-2">
            Sujet <span className="text-red-400">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20 focus:outline-none focus:border-blue-400/50 transition-colors"
            disabled={formState === 'loading'}
          >
            <option value="" className="bg-slate-900">
              Sélectionnez un sujet
            </option>
            <option value="Question générale" className="bg-slate-900">
              Question générale
            </option>
            <option value="Problème technique" className="bg-slate-900">
              Problème technique
            </option>
            <option value="Suggestion d'amélioration" className="bg-slate-900">
              Suggestion d'amélioration
            </option>
            <option value="Signalement de bug" className="bg-slate-900">
              Signalement de bug
            </option>
            <option value="Données personnelles (RGPD)" className="bg-slate-900">
              Données personnelles (RGPD)
            </option>
            <option value="Partenariat" className="bg-slate-900">
              Partenariat
            </option>
            <option value="Autre" className="bg-slate-900">
              Autre
            </option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-white font-medium mb-2">
            Message <span className="text-red-400">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20 focus:outline-none focus:border-blue-400/50 transition-colors placeholder:text-white/40 resize-none"
            placeholder="Décrivez votre demande en détail..."
            disabled={formState === 'loading'}
          />
          <p className="text-white/40 text-sm mt-2">
            Minimum 10 caractères
          </p>
        </div>

        {/* Success Message */}
        {formState === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-start gap-3"
          >
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-green-300 font-medium">Message envoyé avec succès !</p>
              <p className="text-green-200/70 text-sm mt-1">
                Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.
              </p>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {formState === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-300 font-medium">Erreur lors de l'envoi</p>
              <p className="text-red-200/70 text-sm mt-1">{errorMessage}</p>
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={formState === 'loading'}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white px-8 py-4 rounded-xl transition-colors font-medium flex items-center justify-center gap-2 disabled:cursor-not-allowed"
          >
            {formState === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Envoyer le message
              </>
            )}
          </button>
        </div>

        {/* reCAPTCHA Info */}
        {executeRecaptcha && (
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Shield className="w-4 h-4 text-green-400" />
            <span>
              Ce formulaire est protégé par reCAPTCHA et soumis à la{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Politique de confidentialité
              </a>{' '}
              et aux{' '}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Conditions d'utilisation
              </a>{' '}
              de Google.
            </span>
          </div>
        )}

        {/* Info */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <p className="text-blue-200 text-sm leading-relaxed">
            <strong className="text-blue-400">Protection de vos données :</strong> Les informations
            que vous nous transmettez sont uniquement utilisées pour traiter votre demande et ne
            seront jamais partagées avec des tiers. Consultez notre{' '}
            <a href="/confidentialite" className="underline hover:text-blue-300">
              politique de confidentialité
            </a>{' '}
            pour plus d'informations.
          </p>
        </div>
      </form>
    </div>
  );
}
