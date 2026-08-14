-- Leads issus du diagnostic public /diagnostic.
-- Une ligne = une personne qui a laissé ses coordonnées, avec toutes ses réponses
-- et les résultats calculés au moment de l'envoi (figés : les hypothèses du
-- simulateur peuvent changer, le chiffre qu'elle a vu ne doit pas bouger).

create table if not exists public.leads (
	id uuid primary key default gen_random_uuid(),
	created_at timestamptz not null default now(),

	-- Coordonnées
	prenom text not null,
	nom text not null,
	email text not null,
	telephone text not null,

	-- Réponses au questionnaire
	taille_cabinet numeric not null,
	heures_dirigeant numeric not null,
	heures_collaborateur numeric not null,
	taux_horaire numeric not null,
	objectif text not null check (objectif in ('temps', 'argent', 'vie', 'erreurs')),
	taches text[] not null default '{}',

	-- Résultats affichés au prospect, figés
	heures_dirigeant_semaine numeric,
	heures_dirigeant_jours_an numeric,
	heures_cabinet_an numeric,
	ca_potentiel numeric,
	etp_equivalent numeric,
	premiere_automatisation text,

	-- Suivi commercial
	statut text not null default 'nouveau'
		check (statut in ('nouveau', 'contacte', 'rdv', 'client', 'perdu')),
	source text,
	notes text not null default '',
	contacte_at timestamptz
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_statut_idx on public.leads (statut);
create index if not exists leads_email_idx on public.leads (email);

-- Table écrite uniquement côté serveur avec la clé service_role : on active RLS
-- sans policy, ce qui bloque tout accès anon/authenticated.
alter table public.leads enable row level security;
