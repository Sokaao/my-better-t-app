"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TrackerPrivacyPolicy() {
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
						Tracker - Privacy Policy
					</h1>

					<div className="space-y-8 text-gray-700 dark:text-gray-300">
						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								1. Introduction
							</h2>
							<p className="leading-relaxed mb-4">
								This Privacy Policy explains how Tracker (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) collects, uses, and protects your information when you use our TikTok application designed to track and analyze published content data.
							</p>
							<p className="leading-relaxed mb-4">
								By using our application, you agree to the collection and use of information in accordance with this policy.
							</p>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								2. Information We Collect
							</h2>

							<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
								2.1 TikTok Account Information
							</h3>
							<p className="leading-relaxed mb-4">
								When you connect your TikTok account to our application, we may collect:
							</p>
							<ul className="list-disc list-inside space-y-2 mb-4 ml-4">
								<li>Your TikTok username and display name</li>
								<li>Profile picture</li>
								<li>Account statistics (followers, following count)</li>
								<li>Public profile information</li>
							</ul>

							<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
								2.2 Content Data
							</h3>
							<p className="leading-relaxed mb-4">
								We collect data related to your published TikTok content, including:
							</p>
							<ul className="list-disc list-inside space-y-2 mb-4 ml-4">
								<li>Video metadata (title, description, hashtags, publication date)</li>
								<li>Engagement metrics (views, likes, comments, shares)</li>
								<li>Performance analytics over time</li>
								<li>Audience insights and demographics (when available)</li>
							</ul>

							<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
								2.3 Technical Data
							</h3>
							<p className="leading-relaxed mb-4">
								We automatically collect certain technical information:
							</p>
							<ul className="list-disc list-inside space-y-2 mb-4 ml-4">
								<li>Device type and operating system</li>
								<li>IP address</li>
								<li>Browser type (if applicable)</li>
								<li>Usage data and interaction with our application</li>
							</ul>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								3. How We Use Your Information
							</h2>
							<p className="leading-relaxed mb-4">
								We use the collected information for the following purposes:
							</p>
							<ul className="list-disc list-inside space-y-2 mb-4 ml-4">
								<li>To provide and maintain our tracking and analytics services</li>
								<li>To generate performance reports and insights about your content</li>
								<li>To identify trends and patterns in your content performance</li>
								<li>To improve and optimize our application</li>
								<li>To communicate with you about your account and our services</li>
								<li>To ensure the security and integrity of our services</li>
							</ul>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								4. Data Storage and Security
							</h2>
							<p className="leading-relaxed mb-4">
								We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
							</p>
							<p className="leading-relaxed mb-4">
								Your data is stored on secure servers and we use encryption to protect sensitive information during transmission.
							</p>
							<p className="leading-relaxed mb-4">
								We retain your data for as long as your account is active or as needed to provide you with our services. You may request deletion of your data at any time.
							</p>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								5. Data Sharing
							</h2>
							<p className="leading-relaxed mb-4">
								We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
							</p>
							<ul className="list-disc list-inside space-y-2 mb-4 ml-4">
								<li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our application</li>
								<li><strong>Legal Requirements:</strong> When required by law or to respond to legal process</li>
								<li><strong>Protection:</strong> To protect our rights, privacy, safety, or property</li>
								<li><strong>Consent:</strong> With your explicit consent</li>
							</ul>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								6. TikTok API Compliance
							</h2>
							<p className="leading-relaxed mb-4">
								Our application accesses TikTok data through official TikTok APIs in compliance with TikTok&apos;s Developer Terms of Service and Platform Policies.
							</p>
							<p className="leading-relaxed mb-4">
								We only request the permissions necessary to provide our services and handle all data in accordance with TikTok&apos;s data usage guidelines.
							</p>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								7. Your Rights
							</h2>
							<p className="leading-relaxed mb-4">
								You have the following rights regarding your personal data:
							</p>
							<ul className="list-disc list-inside space-y-2 mb-4 ml-4">
								<li><strong>Access:</strong> Request access to your personal data</li>
								<li><strong>Correction:</strong> Request correction of inaccurate data</li>
								<li><strong>Deletion:</strong> Request deletion of your data</li>
								<li><strong>Portability:</strong> Request a copy of your data in a structured format</li>
								<li><strong>Withdrawal:</strong> Withdraw consent and disconnect your TikTok account at any time</li>
								<li><strong>Objection:</strong> Object to certain processing of your data</li>
							</ul>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								8. Children&apos;s Privacy
							</h2>
							<p className="leading-relaxed mb-4">
								Our application is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If we discover that we have collected personal information from a child under 13, we will take steps to delete that information.
							</p>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								9. Changes to This Policy
							</h2>
							<p className="leading-relaxed mb-4">
								We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
							</p>
							<p className="leading-relaxed mb-4">
								We encourage you to review this Privacy Policy periodically for any changes.
							</p>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								10. Contact Us
							</h2>
							<p className="leading-relaxed mb-4">
								If you have any questions about this Privacy Policy or our data practices, please contact us:
							</p>
							<p className="mb-2">
								<strong>Email:</strong>{" "}
								<a href="mailto:synapsis.devis@gmail.com" className="text-[#069D14] hover:underline">
									synapsis.devis@gmail.com
								</a>
							</p>
							<p className="mb-2">
								<strong>Company:</strong> Synapsis
							</p>
							<p className="mb-2">
								<strong>Address:</strong><br />
								1 Impasse des frênes<br />
								15260 Neuvéglise-Sur-Truyère<br />
								France
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
