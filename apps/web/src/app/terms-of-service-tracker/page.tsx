"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfServiceTracker() {
	return (
		<div className="min-h-screen bg-white dark:bg-gray-950">
			<nav className="border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-50">
				<div className="container mx-auto px-6 py-5">
					<div className="flex justify-between items-center">
						<Link href="/" className="text-3xl font-bold text-gray-900 dark:text-white hover:text-[#069D14] transition-colors">
							Synapsis
						</Link>
						<Link
							href="/"
							className="text-gray-600 dark:text-gray-300 hover:text-[#069D14] transition-colors font-medium flex items-center gap-2"
						>
							<ArrowLeft className="w-4 h-4" />
							Retour à l&apos;accueil
						</Link>
					</div>
				</div>
			</nav>

			<section className="py-20 px-6">
				<div className="container mx-auto max-w-4xl">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
						Terms of Service - Tracker App
					</h1>

					<div className="space-y-8 text-gray-700 dark:text-gray-300">
						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								1. Acceptance of Terms
							</h2>
							<p className="leading-relaxed mb-4">
								By accessing or using Tracker App (&quot;the Service&quot;), a TikTok analytics application developed by Synapsis, you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use the Service.
							</p>
							<p className="leading-relaxed mb-4">
								These Terms constitute a legally binding agreement between you and Synapsis regarding your use of the Service.
							</p>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								2. Service Provider Information
							</h2>
							<p className="mb-2">
								<strong>Company:</strong> Synapsis
							</p>
							<p className="mb-2">
								<strong>Legal Form:</strong> Auto-entrepreneur (Sole Proprietorship)
							</p>
							<p className="mb-2">
								<strong>Representative:</strong> Frédéric Mallet
							</p>
							<p className="mb-2">
								<strong>Address:</strong><br />
								1 Impasse des frênes<br />
								15260 Neuvéglise-Sur-Truyère<br />
								France
							</p>
							<p className="mb-2">
								<strong>SIRET:</strong> 994 245 355 00015
							</p>
							<p className="mb-2">
								<strong>Email:</strong>{" "}
								<a href="mailto:synapsis.devis@gmail.com" className="text-[#069D14] hover:underline">
									synapsis.devis@gmail.com
								</a>
							</p>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								3. Description of Service
							</h2>
							<p className="leading-relaxed mb-4">
								Tracker App is a TikTok analytics application that allows users to:
							</p>
							<ul className="list-disc list-inside space-y-2 mb-4 ml-4">
								<li>Connect their TikTok account through TikTok&apos;s official API</li>
								<li>Track and monitor performance metrics of their published TikTok content</li>
								<li>Analyze engagement data including views, likes, comments, and shares</li>
								<li>Access historical performance data and trends</li>
								<li>Generate insights to improve content strategy</li>
							</ul>
							<p className="leading-relaxed mb-4">
								The Service operates by accessing data through TikTok&apos;s official API with your explicit authorization.
							</p>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								4. TikTok Account Authorization
							</h2>
							<p className="leading-relaxed mb-4">
								To use the Service, you must authorize access to your TikTok account. By doing so, you:
							</p>
							<ul className="list-disc list-inside space-y-2 mb-4 ml-4">
								<li>Confirm that you are the legitimate owner of the TikTok account</li>
								<li>Grant us permission to access your TikTok data as described in our Privacy Policy</li>
								<li>Acknowledge that we will collect and process data about your published content</li>
								<li>Understand that you can revoke access at any time</li>
							</ul>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								5. Data Collection and Use
							</h2>
							<p className="leading-relaxed mb-4">
								When you use our Service, we collect the following types of data from your TikTok account:
							</p>
							<ul className="list-disc list-inside space-y-2 mb-4 ml-4">
								<li><strong>Profile Information:</strong> Username, display name, profile picture, bio, follower/following counts</li>
								<li><strong>Video Data:</strong> Video metadata, titles, descriptions, hashtags, publication dates</li>
								<li><strong>Engagement Metrics:</strong> Views, likes, comments, shares for your published content</li>
								<li><strong>Analytics Data:</strong> Performance trends and audience insights when available</li>
							</ul>
							<p className="leading-relaxed mb-4">
								This data is used exclusively to provide you with analytics and insights about your own content. For complete details, please refer to our{" "}
								<Link href="/privacy-policy-tracker-app" className="text-[#069D14] hover:underline">
									Privacy Policy
								</Link>.
							</p>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								6. User Responsibilities
							</h2>
							<p className="leading-relaxed mb-4">
								By using the Service, you agree to:
							</p>
							<ul className="list-disc list-inside space-y-2 mb-4 ml-4">
								<li>Provide accurate and truthful information</li>
								<li>Use the Service only for your own TikTok accounts that you legitimately own or manage</li>
								<li>Comply with TikTok&apos;s Terms of Service and Community Guidelines</li>
								<li>Not use the Service for any unlawful purpose</li>
								<li>Not attempt to reverse engineer, modify, or create derivative works of the Service</li>
								<li>Not use automated systems or bots to access the Service</li>
								<li>Not share your account credentials with third parties</li>
							</ul>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								7. Intellectual Property
							</h2>
							<p className="leading-relaxed mb-4">
								The Service, including its design, features, code, and content, is owned by Synapsis and is protected by intellectual property laws. You may not:
							</p>
							<ul className="list-disc list-inside space-y-2 mb-4 ml-4">
								<li>Copy, modify, or distribute any part of the Service</li>
								<li>Use our trademarks, logos, or branding without permission</li>
								<li>Resell or redistribute access to the Service</li>
							</ul>
							<p className="leading-relaxed mb-4">
								Your TikTok content remains your property. We claim no ownership over your content or data.
							</p>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								8. Third-Party Services
							</h2>
							<p className="leading-relaxed mb-4">
								Our Service integrates with TikTok&apos;s API. Your use of TikTok is governed by TikTok&apos;s own Terms of Service and Privacy Policy. We are not responsible for:
							</p>
							<ul className="list-disc list-inside space-y-2 mb-4 ml-4">
								<li>Changes to TikTok&apos;s API or services that may affect our Service</li>
								<li>Actions taken by TikTok regarding your account</li>
								<li>TikTok&apos;s data practices or policies</li>
							</ul>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								9. Service Availability
							</h2>
							<p className="leading-relaxed mb-4">
								We strive to provide reliable access to the Service, but we do not guarantee:
							</p>
							<ul className="list-disc list-inside space-y-2 mb-4 ml-4">
								<li>Uninterrupted or error-free operation</li>
								<li>Availability at all times</li>
								<li>Compatibility with all devices or platforms</li>
								<li>Accuracy of all data retrieved from TikTok&apos;s API</li>
							</ul>
							<p className="leading-relaxed mb-4">
								We reserve the right to modify, suspend, or discontinue the Service at any time with reasonable notice.
							</p>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								10. Limitation of Liability
							</h2>
							<p className="leading-relaxed mb-4">
								To the maximum extent permitted by law, Synapsis shall not be liable for:
							</p>
							<ul className="list-disc list-inside space-y-2 mb-4 ml-4">
								<li>Any indirect, incidental, special, or consequential damages</li>
								<li>Loss of profits, data, or business opportunities</li>
								<li>Damages arising from your use or inability to use the Service</li>
								<li>Actions or decisions you make based on analytics provided by the Service</li>
							</ul>
							<p className="leading-relaxed mb-4">
								Our total liability shall not exceed the amount you paid for the Service, if any.
							</p>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								11. Indemnification
							</h2>
							<p className="leading-relaxed mb-4">
								You agree to indemnify and hold harmless Synapsis and its owner from any claims, damages, losses, or expenses arising from:
							</p>
							<ul className="list-disc list-inside space-y-2 mb-4 ml-4">
								<li>Your use of the Service</li>
								<li>Your violation of these Terms</li>
								<li>Your violation of any third-party rights</li>
								<li>Your violation of TikTok&apos;s Terms of Service</li>
							</ul>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								12. Account Termination
							</h2>
							<p className="leading-relaxed mb-4">
								You may terminate your use of the Service at any time by:
							</p>
							<ul className="list-disc list-inside space-y-2 mb-4 ml-4">
								<li>Revoking TikTok API access through our app or TikTok settings</li>
								<li>Requesting account deletion by contacting us</li>
							</ul>
							<p className="leading-relaxed mb-4">
								We may terminate or suspend your access if you violate these Terms or for any reason with reasonable notice. Upon termination, your data will be deleted in accordance with our Privacy Policy.
							</p>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								13. Modifications to Terms
							</h2>
							<p className="leading-relaxed mb-4">
								We reserve the right to modify these Terms at any time. Changes will be effective upon posting to this page. Your continued use of the Service after changes constitutes acceptance of the modified Terms.
							</p>
							<p className="leading-relaxed mb-4">
								We will notify users of significant changes via email or through the Service.
							</p>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								14. Governing Law and Jurisdiction
							</h2>
							<p className="leading-relaxed mb-4">
								These Terms are governed by the laws of France. Any disputes arising from these Terms or your use of the Service shall be subject to the exclusive jurisdiction of the courts of France.
							</p>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								15. Severability
							</h2>
							<p className="leading-relaxed mb-4">
								If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
							</p>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								16. Contact Information
							</h2>
							<p className="leading-relaxed mb-4">
								For any questions about these Terms of Service, please contact us:
							</p>
							<p className="mb-2">
								<strong>By Email:</strong>{" "}
								<a href="mailto:synapsis.devis@gmail.com" className="text-[#069D14] hover:underline">
									synapsis.devis@gmail.com
								</a>
							</p>
							<p className="mb-2">
								<strong>By Mail:</strong><br />
								MALLET Frédéric<br />
								1 Impasse des frênes<br />
								15260 Neuvéglise-Sur-Truyère<br />
								France
							</p>
							<p className="mb-2">
								<strong>Phone:</strong> 07 54 08 32 58
							</p>
						</div>
					</div>

					<div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
						<p className="text-sm text-gray-500 dark:text-gray-500">
							Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
						</p>
					</div>
				</div>
			</section>

			<footer className="border-t border-gray-200 dark:border-gray-800 py-8 px-6">
				<div className="container mx-auto max-w-6xl text-center">
					<p className="text-gray-600 dark:text-gray-400 text-sm">
						© 2024 Synapsis. All rights reserved.
					</p>
				</div>
			</footer>
		</div>
	);
}
