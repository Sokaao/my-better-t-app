"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyTrackerApp() {
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
						Privacy Policy - Tracker App
					</h1>

					<div className="space-y-8 text-gray-700 dark:text-gray-300">
						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								1. About This Application
							</h2>
							<p className="leading-relaxed mb-4">
								Tracker App is a TikTok analytics application developed by Synapsis that allows content creators to track, analyze, and monitor the performance of their published content on TikTok.
							</p>
							<p className="leading-relaxed mb-4">
								This Privacy Policy describes how we collect, use, store, and protect your data when using our application.
							</p>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								2. Data Controller
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
								3. Data We Collect Through TikTok API
							</h2>

							<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
								3.1 User Profile Data
							</h3>
							<p className="leading-relaxed mb-4">
								When you authorize our application to access your TikTok account, we collect:
							</p>
							<ul className="list-disc list-inside space-y-2 mb-4 ml-4">
								<li>Open ID (unique identifier)</li>
								<li>Username and display name</li>
								<li>Profile picture URL</li>
								<li>Bio description</li>
								<li>Follower and following counts</li>
								<li>Likes count</li>
								<li>Video count</li>
							</ul>

							<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
								3.2 Video and Content Data
							</h3>
							<p className="leading-relaxed mb-4">
								We collect information about your published videos:
							</p>
							<ul className="list-disc list-inside space-y-2 mb-4 ml-4">
								<li>Video ID and URL</li>
								<li>Title, description, and hashtags</li>
								<li>Cover image</li>
								<li>Duration</li>
								<li>Creation and publication date</li>
								<li>View count</li>
								<li>Like count</li>
								<li>Comment count</li>
								<li>Share count</li>
							</ul>

							<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
								3.3 Analytics Data
							</h3>
							<p className="leading-relaxed mb-4">
								When available through TikTok&apos;s API, we may collect:
							</p>
							<ul className="list-disc list-inside space-y-2 mb-4 ml-4">
								<li>Audience demographics</li>
								<li>Geographic distribution of viewers</li>
								<li>Traffic sources</li>
								<li>Engagement rates over time</li>
							</ul>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								4. Purpose of Data Processing
							</h2>
							<p className="leading-relaxed mb-4">
								We process your data for the following purposes:
							</p>
							<ul className="list-disc list-inside space-y-2 mb-4 ml-4">
								<li><strong>Analytics Dashboard:</strong> Display your content performance metrics in an easy-to-understand format</li>
								<li><strong>Performance Tracking:</strong> Track the evolution of your content metrics over time</li>
								<li><strong>Insights Generation:</strong> Provide actionable insights to improve your content strategy</li>
								<li><strong>Historical Data:</strong> Store historical data to enable trend analysis</li>
								<li><strong>Notifications:</strong> Alert you about significant changes in your metrics (optional)</li>
								<li><strong>Service Improvement:</strong> Improve and optimize our application features</li>
							</ul>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								5. Legal Basis for Processing
							</h2>
							<p className="leading-relaxed mb-4">
								We process your personal data based on:
							</p>
							<ul className="list-disc list-inside space-y-2 mb-4 ml-4">
								<li><strong>Your Consent:</strong> By connecting your TikTok account and authorizing our application</li>
								<li><strong>Contract Performance:</strong> To provide the services you requested</li>
								<li><strong>Legitimate Interest:</strong> To improve our services and ensure security</li>
							</ul>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								6. Data Retention
							</h2>
							<p className="leading-relaxed mb-4">
								We retain your data according to the following policies:
							</p>
							<ul className="list-disc list-inside space-y-2 mb-4 ml-4">
								<li><strong>Account Data:</strong> Retained while your account is active</li>
								<li><strong>Analytics Data:</strong> Retained for up to 24 months to enable historical analysis</li>
								<li><strong>After Account Deletion:</strong> All personal data is deleted within 30 days</li>
							</ul>
							<p className="leading-relaxed mb-4">
								You may request immediate deletion of your data at any time by contacting us.
							</p>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								7. Data Security
							</h2>
							<p className="leading-relaxed mb-4">
								We implement robust security measures to protect your data:
							</p>
							<ul className="list-disc list-inside space-y-2 mb-4 ml-4">
								<li>SSL/TLS encryption for all data transmissions</li>
								<li>Encrypted storage of sensitive data</li>
								<li>Regular security audits and updates</li>
								<li>Access controls and authentication mechanisms</li>
								<li>Secure token storage for TikTok API access</li>
							</ul>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								8. Third-Party Services
							</h2>
							<p className="leading-relaxed mb-4">
								Our application may use the following third-party services:
							</p>
							<ul className="list-disc list-inside space-y-2 mb-4 ml-4">
								<li><strong>TikTok API:</strong> To access your TikTok data with your authorization</li>
								<li><strong>Hosting Provider:</strong> To host our application infrastructure</li>
								<li><strong>Analytics Services:</strong> To monitor application performance (anonymized data only)</li>
							</ul>
							<p className="leading-relaxed mb-4">
								We ensure that all third-party providers comply with applicable data protection regulations.
							</p>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								9. Your Rights (GDPR)
							</h2>
							<p className="leading-relaxed mb-4">
								Under the General Data Protection Regulation (GDPR), you have the following rights:
							</p>
							<ul className="list-disc list-inside space-y-2 mb-4 ml-4">
								<li><strong>Right of Access:</strong> Obtain confirmation and a copy of your personal data</li>
								<li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
								<li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
								<li><strong>Right to Restriction:</strong> Limit the processing of your data</li>
								<li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
								<li><strong>Right to Object:</strong> Object to the processing of your data</li>
								<li><strong>Right to Withdraw Consent:</strong> Revoke your consent at any time</li>
							</ul>

							<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
								How to Exercise Your Rights
							</h3>
							<p className="leading-relaxed mb-4">
								To exercise any of these rights, please contact us at:{" "}
								<a href="mailto:synapsis.devis@gmail.com" className="text-[#069D14] hover:underline">
									synapsis.devis@gmail.com
								</a>
							</p>
							<p className="leading-relaxed mb-4">
								We will respond to your request within one month of receipt.
							</p>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								10. Revoking TikTok Access
							</h2>
							<p className="leading-relaxed mb-4">
								You can revoke our application&apos;s access to your TikTok account at any time:
							</p>
							<ul className="list-disc list-inside space-y-2 mb-4 ml-4">
								<li>Through our application settings</li>
								<li>Through TikTok&apos;s privacy settings (Settings → Privacy → Manage app permissions)</li>
								<li>By contacting us directly</li>
							</ul>
							<p className="leading-relaxed mb-4">
								Upon revocation, we will stop collecting new data and delete your existing data within 30 days unless you request immediate deletion.
							</p>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								11. Filing a Complaint
							</h2>
							<p className="leading-relaxed mb-4">
								If you believe your data protection rights have been violated, you have the right to file a complaint with a supervisory authority:
							</p>
							<p className="mb-2">
								<strong>CNIL (Commission Nationale de l&apos;Informatique et des Libertés)</strong><br />
								3 Place de Fontenoy<br />
								TSA 80715<br />
								75334 PARIS CEDEX 07<br />
								France
							</p>
							<p className="mb-2">
								Website:{" "}
								<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#069D14] hover:underline">
									www.cnil.fr
								</a>
							</p>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								12. Children&apos;s Privacy
							</h2>
							<p className="leading-relaxed mb-4">
								Our application is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
							</p>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								13. International Data Transfers
							</h2>
							<p className="leading-relaxed mb-4">
								Your data may be processed on servers located outside of France or the European Union. In such cases, we ensure appropriate safeguards are in place to protect your data in accordance with GDPR requirements.
							</p>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								14. Updates to This Policy
							</h2>
							<p className="leading-relaxed mb-4">
								We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The updated policy will be posted on this page with a new &quot;Last updated&quot; date.
							</p>
							<p className="leading-relaxed mb-4">
								We encourage you to review this policy periodically. Continued use of our application after any changes constitutes your acceptance of the updated policy.
							</p>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								15. Contact Information
							</h2>
							<p className="leading-relaxed mb-4">
								For any questions or concerns about this Privacy Policy or our data practices, please contact us:
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
