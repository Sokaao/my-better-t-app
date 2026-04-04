"use client";

import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Sparkles, Rocket, Zap, MessageSquare, Clock, Shield, Wrench } from "lucide-react";
import Link from "next/link";

export default function Offres() {
	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<div className="min-h-screen bg-white dark:bg-gray-950">
			{/* Navigation */}
			<nav className="border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-50">
				<div className="container mx-auto px-6 py-5">
					<div className="flex justify-between items-center">
						<Link href="/" className="flex items-center">
							<img
								src="/images/logo-light.svg"
								alt="Synapsis"
								className="h-14 dark:hidden"
							/>
							<img
								src="/images/logo-dark.svg"
								alt="Synapsis"
								className="h-14 hidden dark:block"
							/>
						</Link>
						<div className="hidden md:flex gap-8 items-center">
							<Link
								href="/#services"
								className="text-gray-600 dark:text-gray-300 hover:text-[#069D14] transition-colors font-medium text-sm"
							>
								Solutions
							</Link>
							<Link
								href="/#methode"
								className="text-gray-600 dark:text-gray-300 hover:text-[#069D14] transition-colors font-medium text-sm"
							>
								Methode
							</Link>
							<button
								onClick={() => scrollToSection("offres")}
								className="text-[#069D14] font-medium text-sm"
							>
								Offres
							</button>
							<Link
								href="/#qui-suis-je"
								className="text-gray-600 dark:text-gray-300 hover:text-[#069D14] transition-colors font-medium text-sm"
							>
								Qui suis-je ?
							</Link>
							<Link
								href="/rendez-vous"
								className="border-2 border-[#069D14] text-[#069D14] hover:bg-[#069D14] hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1.5 group"
							>
								Appel de decouverte
								<ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
							</Link>
						</div>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
				<div className="container mx-auto max-w-6xl text-center">
					<div className="inline-block bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
						OFFRES & TARIFS
					</div>
					<h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
						Automatise ton business.{" "}
						<span className="text-[#069D14]">Recupere 1 jour par semaine.</span>
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-4">
						Tu passes encore <strong>4h par semaine</strong> sur des taches que tu pourrais ne plus jamais faire.
					</p>
					<p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
						Relances, facturation, suivi client - on automatise ca en moins d&apos;une semaine. <strong className="text-[#069D14]">ROI garanti sous 60 jours.</strong>
					</p>
					<Link
						href="/rendez-vous"
						className="bg-[#069D14] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#058a12] transition-all duration-300 inline-flex items-center gap-2 group shadow-lg hover:shadow-xl"
					>
						Reserver mon appel decouverte gratuit
						<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
					</Link>
				</div>
			</section>

			{/* Infos importantes */}
			<section className="py-12 px-6 border-b border-gray-200 dark:border-gray-800">
				<div className="container mx-auto max-w-6xl">
					<div className="grid md:grid-cols-3 gap-6">
						<div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
							<div className="w-12 h-12 bg-[#069D14]/10 rounded-xl flex items-center justify-center">
								<Shield className="w-6 h-6 text-[#069D14]" />
							</div>
							<div>
								<p className="font-semibold text-gray-900 dark:text-white">100% independant</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">Tous les workflows t&apos;appartiennent</p>
							</div>
						</div>
						<div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
							<div className="w-12 h-12 bg-[#0A4D8C]/10 rounded-xl flex items-center justify-center">
								<Wrench className="w-6 h-6 text-[#0A4D8C]" />
							</div>
							<div>
								<p className="font-semibold text-gray-900 dark:text-white">Prerequis</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">Compte n8n Cloud (~20 EUR/mois)</p>
							</div>
						</div>
						<div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
							<div className="w-12 h-12 bg-[#F2D335]/10 rounded-xl flex items-center justify-center">
								<Zap className="w-6 h-6 text-[#F2D335]" />
							</div>
							<div>
								<p className="font-semibold text-gray-900 dark:text-white">Integrations</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">Notion, Pennylane, Calendly, HubSpot</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Section Offres */}
			<section id="offres" className="py-20 px-6">
				<div className="container mx-auto max-w-7xl">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
							Choisis l&apos;offre adaptee a tes besoins
						</h2>
						<p className="text-xl text-gray-600 dark:text-gray-400">
							3 packs clairs + une option sur-mesure pour les projets specifiques
						</p>
					</div>

					{/* Grille des offres */}
					<div className="grid lg:grid-cols-4 gap-6">
						{/* Offre 1 - Zero Relance */}
						<Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-[#069D14] hover:shadow-xl hover:shadow-[#069D14]/20 transition-all duration-300 flex flex-col">
							<div className="mb-6">
								<div className="w-14 h-14 bg-[#069D14]/20 rounded-2xl flex items-center justify-center mb-4">
									<Sparkles className="w-7 h-7 text-[#069D14]" />
								</div>
								<h3 className="text-xl font-bold text-white mb-2">
									Zero Relance Manuelle
								</h3>
								<p className="text-sm text-gray-300 mb-4">
									Pour les cabinets qui perdent des honoraires parce que personne ne relance systematiquement
								</p>
								<div className="flex items-baseline gap-1">
									<span className="text-4xl font-bold text-[#069D14]">900</span>
									<span className="text-xl text-gray-400">EUR</span>
								</div>
								<p className="text-sm text-gray-400 mt-1">Paiement unique</p>
							</div>

							<div className="space-y-3 mb-6 flex-grow">
								<p className="text-sm font-semibold text-white">Ce qu&apos;on installe ensemble :</p>
								<div className="flex items-start gap-2">
									<CheckCircle2 className="w-4 h-4 text-[#069D14] flex-shrink-0 mt-0.5" />
									<span className="text-sm text-gray-300">Audit de ton flux actuel (45 min)</span>
								</div>
								<div className="flex items-start gap-2">
									<CheckCircle2 className="w-4 h-4 text-[#069D14] flex-shrink-0 mt-0.5" />
									<span className="text-sm text-gray-300">1 automatisation deployee au choix :</span>
								</div>
								<div className="ml-6 space-y-1 text-xs text-gray-400">
									<p>• Relances devis J+2 / J+5 / J+10</p>
									<p>• Rappels RDV automatiques</p>
									<p>• Facturation recurrente</p>
									<p>• Suivi prospects CRM</p>
									<p>• Notifications echeances</p>
								</div>
								<div className="flex items-start gap-2">
									<CheckCircle2 className="w-4 h-4 text-[#069D14] flex-shrink-0 mt-0.5" />
									<span className="text-sm text-gray-300">Formation de ton equipe (1h)</span>
								</div>
								<div className="flex items-start gap-2">
									<CheckCircle2 className="w-4 h-4 text-[#069D14] flex-shrink-0 mt-0.5" />
									<span className="text-sm text-gray-300">Support 30 jours inclus</span>
								</div>
								<div className="flex items-start gap-2">
									<Clock className="w-4 h-4 text-[#069D14] flex-shrink-0 mt-0.5" />
									<span className="text-sm text-gray-300"><strong className="text-white">Livraison : 48h</strong> apres l&apos;audit</span>
								</div>
							</div>

							<div className="pt-4 border-t border-gray-700">
								<p className="text-sm text-[#069D14] font-medium mb-4">
									Ce processus tourne tout seul, sans intervention humaine, a vie.
								</p>
								<Link
									href="/rendez-vous"
									className="w-full bg-[#069D14] text-white px-4 py-3 rounded-lg font-medium hover:bg-[#058a12] transition-all duration-300 flex items-center justify-center gap-2 group"
								>
									Choisir cette offre
									<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
								</Link>
							</div>
						</Card>

						{/* Offre 2 - Pilote Automatique (Populaire) */}
						<Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-[#0A4D8C] hover:shadow-xl hover:shadow-[#0A4D8C]/20 transition-all duration-300 flex flex-col relative">
							<div className="absolute -top-3 left-1/2 -translate-x-1/2">
								<span className="bg-[#069D14] text-white px-4 py-1 rounded-full text-sm font-medium">
									Populaire
								</span>
							</div>
							<div className="mb-6 pt-2">
								<div className="w-14 h-14 bg-[#0A4D8C]/20 rounded-2xl flex items-center justify-center mb-4">
									<Rocket className="w-7 h-7 text-[#0A4D8C]" />
								</div>
								<h3 className="text-xl font-bold text-white mb-2">
									Cabinet Pilote Automatique
								</h3>
								<p className="text-sm text-gray-300 mb-4">
									Pour les cabinets qui veulent supprimer les 3 principales pertes de temps en une fois
								</p>
								<div className="flex items-baseline gap-1">
									<span className="text-4xl font-bold text-[#0A4D8C]">2 200</span>
									<span className="text-xl text-gray-400">EUR</span>
								</div>
								<p className="text-sm text-gray-400 mt-1">Paiement unique</p>
							</div>

							<div className="space-y-3 mb-6 flex-grow">
								<p className="text-sm font-semibold text-white">Ce qu&apos;on installe ensemble :</p>
								<div className="flex items-start gap-2">
									<CheckCircle2 className="w-4 h-4 text-[#0A4D8C] flex-shrink-0 mt-0.5" />
									<span className="text-sm text-gray-300">Audit complet de tes processus (1h30)</span>
								</div>
								<div className="flex items-start gap-2">
									<CheckCircle2 className="w-4 h-4 text-[#0A4D8C] flex-shrink-0 mt-0.5" />
									<span className="text-sm text-gray-300"><strong className="text-white">3 automatisations</strong> au choix</span>
								</div>
								<div className="flex items-start gap-2">
									<CheckCircle2 className="w-4 h-4 text-[#0A4D8C] flex-shrink-0 mt-0.5" />
									<span className="text-sm text-gray-300">Integration avec tes outils existants</span>
								</div>
								<div className="flex items-start gap-2">
									<CheckCircle2 className="w-4 h-4 text-[#0A4D8C] flex-shrink-0 mt-0.5" />
									<span className="text-sm text-gray-300">Formation equipe (2h)</span>
								</div>
								<div className="flex items-start gap-2">
									<CheckCircle2 className="w-4 h-4 text-[#0A4D8C] flex-shrink-0 mt-0.5" />
									<span className="text-sm text-gray-300">Support 60 jours inclus</span>
								</div>
								<div className="flex items-start gap-2">
									<Clock className="w-4 h-4 text-[#0A4D8C] flex-shrink-0 mt-0.5" />
									<span className="text-sm text-gray-300"><strong className="text-white">Livraison : 5 jours</strong> ouvres</span>
								</div>
							</div>

							<div className="bg-gray-800/50 p-3 rounded-lg mb-4 border border-gray-700">
								<p className="text-sm text-gray-300">
									<strong className="text-[#0A4D8C]">Option maintenance :</strong> 150 EUR/mois<br/>
									<span className="text-xs text-gray-400">Surveillance, corrections, 1 ajustement/mois</span>
								</p>
							</div>

							<div className="pt-4 border-t border-gray-700">
								<p className="text-sm text-[#0A4D8C] font-medium mb-4">
									4 a 6h recuperees chaque semaine. Zero lead perdu.
								</p>
								<Link
									href="/rendez-vous"
									className="w-full bg-[#0A4D8C] text-white px-4 py-3 rounded-lg font-medium hover:bg-[#083d6e] transition-all duration-300 flex items-center justify-center gap-2 group"
								>
									Choisir cette offre
									<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
								</Link>
							</div>
						</Card>

						{/* Offre 3 - Transformation Complete */}
						<Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-[#D4A800] hover:shadow-xl hover:shadow-[#D4A800]/20 transition-all duration-300 flex flex-col">
							<div className="mb-6">
								<div className="w-14 h-14 bg-[#D4A800]/20 rounded-2xl flex items-center justify-center mb-4">
									<Zap className="w-7 h-7 text-[#D4A800]" />
								</div>
								<h3 className="text-xl font-bold text-white mb-2">
									Transformation Complete
								</h3>
								<p className="text-sm text-gray-300 mb-4">
									Pour les cabinets qui veulent deleguer l&apos;ensemble de leur back-office operationnel
								</p>
								<div className="flex items-baseline gap-1">
									<span className="text-4xl font-bold text-[#D4A800]">4 000</span>
									<span className="text-xl text-gray-400">EUR</span>
								</div>
								<p className="text-sm text-[#D4A800] mt-1">+ 400 EUR/mois d&apos;accompagnement</p>
							</div>

							<div className="space-y-3 mb-6 flex-grow">
								<p className="text-sm font-semibold text-white">Ce qu&apos;on installe ensemble :</p>
								<div className="flex items-start gap-2">
									<CheckCircle2 className="w-4 h-4 text-[#D4A800] flex-shrink-0 mt-0.5" />
									<span className="text-sm text-gray-300"><strong className="text-white">5 automatisations cles</strong> completes</span>
								</div>
								<div className="flex items-start gap-2">
									<CheckCircle2 className="w-4 h-4 text-[#D4A800] flex-shrink-0 mt-0.5" />
									<span className="text-sm text-gray-300"><strong className="text-white">Agents IA sur-mesure</strong></span>
								</div>
								<div className="flex items-start gap-2">
									<CheckCircle2 className="w-4 h-4 text-[#D4A800] flex-shrink-0 mt-0.5" />
									<span className="text-sm text-gray-300">Integrations avancees multi-outils</span>
								</div>
								<div className="flex items-start gap-2">
									<CheckCircle2 className="w-4 h-4 text-[#D4A800] flex-shrink-0 mt-0.5" />
									<span className="text-sm text-gray-300">3 mois d&apos;accompagnement inclus</span>
								</div>
								<div className="flex items-start gap-2">
									<CheckCircle2 className="w-4 h-4 text-[#D4A800] flex-shrink-0 mt-0.5" />
									<span className="text-sm text-gray-300">Reporting mensuel des gains</span>
								</div>
								<div className="flex items-start gap-2">
									<CheckCircle2 className="w-4 h-4 text-[#D4A800] flex-shrink-0 mt-0.5" />
									<span className="text-sm text-gray-300">Support prioritaire</span>
								</div>
							</div>

							<div className="pt-4 border-t border-gray-700">
								<p className="text-sm text-[#D4A800] font-medium mb-4">
									Cabinet autonome sur les taches repetitives. Mesure a 90 jours.
								</p>
								<Link
									href="/rendez-vous"
									className="w-full bg-[#D4A800] text-gray-900 px-4 py-3 rounded-lg font-bold hover:bg-[#b8920a] transition-all duration-300 flex items-center justify-center gap-2 group"
								>
									Choisir cette offre
									<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
								</Link>
							</div>
						</Card>

						{/* Offre 4 - Personnalisee */}
						<Card className="p-6 bg-gradient-to-br from-[#069D14]/5 via-[#0A4D8C]/5 to-[#D4A800]/5 dark:from-[#069D14]/10 dark:via-[#0A4D8C]/10 dark:to-[#D4A800]/10 border-2 border-dashed border-gray-400 dark:border-gray-500 hover:border-[#069D14] hover:shadow-xl transition-all duration-300 flex flex-col">
							<div className="mb-6">
								<div className="w-14 h-14 bg-gradient-to-br from-[#069D14]/20 via-[#0A4D8C]/20 to-[#D4A800]/20 rounded-2xl flex items-center justify-center mb-4">
									<MessageSquare className="w-7 h-7 text-gray-700 dark:text-gray-300" />
								</div>
								<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
									Offre Personnalisee
								</h3>
								<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
									Pour les projets specifiques qui ne rentrent pas dans les cases
								</p>
								<div className="flex items-baseline gap-1">
									<span className="text-4xl font-bold text-gray-900 dark:text-white">Sur devis</span>
								</div>
								<p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Adapte a tes besoins</p>
							</div>

							<div className="space-y-3 mb-6 flex-grow">
								<p className="text-sm font-semibold text-gray-900 dark:text-white">Ideal pour :</p>
								<div className="flex items-start gap-2">
									<CheckCircle2 className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
									<span className="text-sm text-gray-600 dark:text-gray-400">Projets d&apos;automatisation complexes</span>
								</div>
								<div className="flex items-start gap-2">
									<CheckCircle2 className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
									<span className="text-sm text-gray-600 dark:text-gray-400">Integrations API specifiques</span>
								</div>
								<div className="flex items-start gap-2">
									<CheckCircle2 className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
									<span className="text-sm text-gray-600 dark:text-gray-400">Developpement d&apos;agents IA sur-mesure</span>
								</div>
								<div className="flex items-start gap-2">
									<CheckCircle2 className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
									<span className="text-sm text-gray-600 dark:text-gray-400">Accompagnement long terme</span>
								</div>
								<div className="flex items-start gap-2">
									<CheckCircle2 className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
									<span className="text-sm text-gray-600 dark:text-gray-400">Formation approfondie des equipes</span>
								</div>
							</div>

							<div className="pt-4 border-t border-gray-200 dark:border-gray-700">
								<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
									On en discute ensemble pour construire la solution ideale.
								</p>
								<Link
									href="/rendez-vous"
									className="w-full border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-3 rounded-lg font-medium hover:border-[#069D14] hover:text-[#069D14] transition-all duration-300 flex items-center justify-center gap-2 group"
								>
									Discutons de ton projet
									<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
								</Link>
							</div>
						</Card>
					</div>
				</div>
			</section>

			{/* CTA Final */}
			<section className="py-20 px-6">
				<div className="container mx-auto max-w-4xl">
					<Card className="p-12 bg-gradient-to-br from-[#069D14] to-[#0A4D8C] text-white border-0 shadow-2xl text-center">
						<h3 className="text-3xl md:text-4xl font-bold mb-6">
							Pas sur du bon pack ?
						</h3>
						<p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
							L&apos;appel decouverte est <strong>gratuit, 30 minutes, sans engagement</strong>. On identifie ensemble ce qui te fait perdre le plus de temps et je te dis lequel des trois packs correspond exactement a ta situation.
						</p>
						<Link
							href="/rendez-vous"
							className="inline-flex items-center gap-2 bg-white text-[#069D14] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
						>
							<span>Reserver mon appel decouverte gratuit</span>
							<ArrowRight className="w-5 h-5" />
						</Link>
						<div className="flex items-center justify-center gap-6 mt-8 text-white/80 text-sm">
							<div className="flex items-center gap-2">
								<CheckCircle2 className="w-4 h-4" />
								<span>30 minutes</span>
							</div>
							<div className="flex items-center gap-2">
								<CheckCircle2 className="w-4 h-4" />
								<span>Sans engagement</span>
							</div>
							<div className="flex items-center gap-2">
								<CheckCircle2 className="w-4 h-4" />
								<span>100% sur-mesure</span>
							</div>
						</div>
					</Card>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t border-gray-200 dark:border-gray-800 py-12 px-6">
				<div className="container mx-auto max-w-6xl">
					<div className="grid md:grid-cols-4 gap-8 mb-8">
						<div>
							<Link href="/" className="inline-block mb-4">
								<img
									src="/images/logo-light.svg"
									alt="Synapsis"
									className="h-8 dark:hidden"
								/>
								<img
									src="/images/logo-dark.svg"
									alt="Synapsis"
									className="h-8 hidden dark:block"
								/>
							</Link>
						</div>
						<div>
							<h4 className="font-semibold text-gray-900 dark:text-white mb-4">
								Contact
							</h4>
							<p className="text-gray-600 dark:text-gray-400 text-sm">
								contact@mysynapsis.fr
							</p>
						</div>
						<div>
							<h4 className="font-semibold text-gray-900 dark:text-white mb-4">
								Reseau professionnel
							</h4>
							<a
								href="https://www.linkedin.com/in/frédéric-mallet-526426397/"
								target="_blank"
								rel="noopener noreferrer"
								className="space-y-7 text-gray-600 dark:text-gray-300 hover:text-[#069D14] transition-colors font-medium text-sm flex items-center gap-2"
							>
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
									<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
								</svg>
								LinkedIn
							</a>
							<a
								href="https://www.instagram.com/synaps_is/"
								target="_blank"
								rel="noopener noreferrer"
								className="pt-2 text-gray-600 dark:text-gray-300 hover:text-[#069D14] transition-colors font-medium text-sm flex items-center gap-2"
							>
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
								</svg>
								Instagram
							</a>
						</div>
						<div>
							<h4 className="font-semibold text-gray-900 dark:text-white mb-4">
								Legal
							</h4>
							<div className="space-y-2">
								<Link
									href="/mentions-legales"
									className="text-gray-600 dark:text-gray-300 hover:text-[#069D14] transition-colors font-medium text-sm flex items-center gap-2"
								>
									Mentions legales
								</Link>
								<Link
									href="/politique-confidentialite"
									className="text-gray-600 dark:text-gray-300 hover:text-[#069D14] transition-colors font-medium text-sm flex items-center gap-2"
								>
									Politique de confidentialite
								</Link>
							</div>
						</div>
					</div>
					<div className="text-center text-gray-500 dark:text-gray-500 border-t border-gray-200 dark:border-gray-800 pt-8 text-sm">
						© 2024 Synapsis. Tous droits reserves.
					</div>
				</div>
			</footer>
		</div>
	);
}
