"use client";

import React, {useState} from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmissionResult('Votre message a été envoyé avec succès !');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <Input
          type="text"
          id="name"
          placeholder="Votre Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <Input
          type="email"
          id="email"
          placeholder="Votre Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <Textarea
          id="message"
          placeholder="Votre Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          required
        />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
      </Button>

      {submissionResult && (
        <p className="mt-4 text-center text-green-500">{submissionResult}</p>
      )}
    </form>
  );
};

export default ContactForm;
