"use client";

import { useState } from "react";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { Button, ButtonArrow } from "@/components/ui/button";
import { contact } from "@/lib/site";

const channels = [
  { label: "Email", icon: Mail, value: contact.email, href: `mailto:${contact.email}` },
  { label: "LinkedIn", icon: Linkedin, value: "marquesviniciusmelomartins", href: contact.linkedin },
  { label: "GitHub", icon: Github, value: "marquesvinicius", href: contact.github },
];

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function ContatoPage() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [opened, setOpened] = useState(false);

  const validate = () => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Nome é obrigatório";
    if (!form.email.trim()) e.email = "Email é obrigatório";
    else if (!isValidEmail(form.email)) e.email = "Email inválido";
    if (!form.subject.trim()) e.subject = "Assunto é obrigatório";
    if (form.message.trim().length < 10) e.message = "Mensagem deve ter pelo menos 10 caracteres";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // abre o cliente de email do visitante com a mensagem já preenchida
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const body = `${form.message}\n\n- ${form.name} (${form.email})`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  const field = (name: keyof FormData, label: string, props: Record<string, unknown> = {}, textarea = false) => {
    const common = {
      id: name,
      name,
      value: form[name],
      onChange: handleChange,
      className: textarea ? "field field-compose resize-none" : "field",
      "aria-invalid": errors[name] ? true : undefined,
      "aria-describedby": errors[name] ? `${name}-error` : undefined,
      ...props,
    };
    return (
      <div>
        <label htmlFor={name} className="mb-2 block font-sans text-sm text-muted-foreground">
          {label}
        </label>
        {textarea ? <textarea rows={6} {...common} /> : <input {...common} />}
        {errors[name] && (
          <p id={`${name}-error`} className="mt-1.5 text-sm text-destructive">
            {errors[name]}
          </p>
        )}
      </div>
    );
  };

  return (
    <>
      <PageHeader
        kicker="Contato"
        title="Vamos conversar"
        description="Uma vaga, um projeto ou uma ideia. Respondo em até 24h."
      />

      <section className="section pt-12">
        <div className="wrap grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal>
            <span className="kicker">Canais</span>
            <ul className="border-t border-[var(--line)]">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 border-b border-[var(--line)] py-6"
                  >
                    <span className="flex items-center gap-5">
                      <c.icon className="h-6 w-6 shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-paper" aria-hidden="true" />
                      <span>
                        <span className="block text-xs uppercase tracking-[.16em] text-muted-foreground">{c.label}</span>
                        <span className="display mt-2 block break-all text-[clamp(16px,1.7vw,22px)]">{c.value}</span>
                      </span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-10 grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
              <div>
                <span className="kicker">Interesse</span>
                <div className="flex flex-wrap gap-1.5">
                  {["Front-end", "Full-stack", "Integrações"].map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="kicker">Base</span>
                Brasil · remoto ou presencial
              </div>
            </div>
          </Reveal>

          <Reveal className="surface p-6 sm:p-8">
            <span className="kicker">Mensagem</span>
            <form onSubmit={handleSubmit} noValidate className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                {field("name", "Nome", { placeholder: "Seu nome", autoComplete: "name" })}
                {field("email", "Email", { type: "email", placeholder: "seu@email.com", autoComplete: "email" })}
              </div>
              {field("subject", "Assunto", { placeholder: "Sobre o que vamos falar?" })}
              {field("message", "Mensagem", { placeholder: "Conte um pouco sobre a vaga ou o projeto..." }, true)}
              <Button type="submit" variant="primary" size="lg" font="serif" className="mt-2 w-full">
                Enviar mensagem <ButtonArrow />
              </Button>
              {opened && (
                <p className="text-center text-sm text-muted-foreground" role="status">
                  Seu app de email foi aberto com a mensagem pronta. Se nada abriu, escreva direto para{" "}
                  <a href={`mailto:${contact.email}`} className="text-paper underline underline-offset-4">
                    {contact.email}
                  </a>
                  .
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
