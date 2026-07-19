"use client";

import Link from "next/link";
import SiteNavMinimal from "@/components/site-nav-minimal";
import SiteFooterMinimal from "@/components/site-footer-minimal";

export default function TermsOfServiceTracker() {
	return (
		<>
			<div className="s-bg-grid" />
			<SiteNavMinimal />

			<main>
			<section className="s-blk">
				<div className="s-wrap s-legal" style={{ maxWidth: 820 }}>
					<h1 style={{ marginBottom: 32 }}>Terms of Service - Tracker App</h1>

					<div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
						<div>
							<h2 style={{ marginBottom: 14 }}>1. Acceptance of Terms</h2>
							<p>By accessing or using Tracker App (&quot;the Service&quot;), a TikTok analytics application developed by Synapsis, you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use the Service.</p>
							<p style={{ marginTop: 10 }}>These Terms constitute a legally binding agreement between you and Synapsis regarding your use of the Service.</p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>2. Service Provider Information</h2>
							<p><strong>Company:</strong> Synapsis</p>
							<p><strong>Legal Form:</strong> Auto-entrepreneur (Sole Proprietorship)</p>
							<p><strong>Representative:</strong> Frédéric Mallet</p>
							<p><strong>Address:</strong><br />1 Impasse des frênes<br />15260 Neuvéglise-Sur-Truyère<br />France</p>
							<p><strong>SIRET:</strong> 994 245 355 00015</p>
							<p><strong>Email:</strong> <a href="mailto:contact@mysynapsis.fr">contact@mysynapsis.fr</a></p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>3. Description of Service</h2>
							<p>Tracker App is a TikTok analytics application that allows users to:</p>
							<ul style={{ listStyle: "disc", marginLeft: 20, display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
								<li>Connect their TikTok account through TikTok&apos;s official API</li>
								<li>Track and monitor performance metrics of their published TikTok content</li>
								<li>Analyze engagement data including views, likes, comments, and shares</li>
								<li>Access historical performance data and trends</li>
								<li>Generate insights to improve content strategy</li>
							</ul>
							<p style={{ marginTop: 14 }}>The Service operates by accessing data through TikTok&apos;s official API with your explicit authorization.</p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>4. TikTok Account Authorization</h2>
							<p>To use the Service, you must authorize access to your TikTok account. By doing so, you:</p>
							<ul style={{ listStyle: "disc", marginLeft: 20, display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
								<li>Confirm that you are the legitimate owner of the TikTok account</li>
								<li>Grant us permission to access your TikTok data as described in our Privacy Policy</li>
								<li>Acknowledge that we will collect and process data about your published content</li>
								<li>Understand that you can revoke access at any time</li>
							</ul>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>5. Data Collection and Use</h2>
							<p>When you use our Service, we collect the following types of data from your TikTok account:</p>
							<ul style={{ listStyle: "disc", marginLeft: 20, display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
								<li><strong>Profile Information:</strong> Username, display name, profile picture, bio, follower/following counts</li>
								<li><strong>Video Data:</strong> Video metadata, titles, descriptions, hashtags, publication dates</li>
								<li><strong>Engagement Metrics:</strong> Views, likes, comments, shares for your published content</li>
								<li><strong>Analytics Data:</strong> Performance trends and audience insights when available</li>
							</ul>
							<p style={{ marginTop: 14 }}>
								This data is used exclusively to provide you with analytics and insights about your own content. For complete details, please refer to our{" "}
								<Link href="/privacy-policy-tracker-app">Privacy Policy</Link>.
							</p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>6. User Responsibilities</h2>
							<p>By using the Service, you agree to:</p>
							<ul style={{ listStyle: "disc", marginLeft: 20, display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
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
							<h2 style={{ marginBottom: 14 }}>7. Intellectual Property</h2>
							<p>The Service, including its design, features, code, and content, is owned by Synapsis and is protected by intellectual property laws. You may not:</p>
							<ul style={{ listStyle: "disc", marginLeft: 20, display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
								<li>Copy, modify, or distribute any part of the Service</li>
								<li>Use our trademarks, logos, or branding without permission</li>
								<li>Resell or redistribute access to the Service</li>
							</ul>
							<p style={{ marginTop: 14 }}>Your TikTok content remains your property. We claim no ownership over your content or data.</p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>8. Third-Party Services</h2>
							<p>Our Service integrates with TikTok&apos;s API. Your use of TikTok is governed by TikTok&apos;s own Terms of Service and Privacy Policy. We are not responsible for:</p>
							<ul style={{ listStyle: "disc", marginLeft: 20, display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
								<li>Changes to TikTok&apos;s API or services that may affect our Service</li>
								<li>Actions taken by TikTok regarding your account</li>
								<li>TikTok&apos;s data practices or policies</li>
							</ul>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>9. Service Availability</h2>
							<p>We strive to provide reliable access to the Service, but we do not guarantee:</p>
							<ul style={{ listStyle: "disc", marginLeft: 20, display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
								<li>Uninterrupted or error-free operation</li>
								<li>Availability at all times</li>
								<li>Compatibility with all devices or platforms</li>
								<li>Accuracy of all data retrieved from TikTok&apos;s API</li>
							</ul>
							<p style={{ marginTop: 14 }}>We reserve the right to modify, suspend, or discontinue the Service at any time with reasonable notice.</p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>10. Limitation of Liability</h2>
							<p>To the maximum extent permitted by law, Synapsis shall not be liable for:</p>
							<ul style={{ listStyle: "disc", marginLeft: 20, display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
								<li>Any indirect, incidental, special, or consequential damages</li>
								<li>Loss of profits, data, or business opportunities</li>
								<li>Damages arising from your use or inability to use the Service</li>
								<li>Actions or decisions you make based on analytics provided by the Service</li>
							</ul>
							<p style={{ marginTop: 14 }}>Our total liability shall not exceed the amount you paid for the Service, if any.</p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>11. Indemnification</h2>
							<p>You agree to indemnify and hold harmless Synapsis and its owner from any claims, damages, losses, or expenses arising from:</p>
							<ul style={{ listStyle: "disc", marginLeft: 20, display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
								<li>Your use of the Service</li>
								<li>Your violation of these Terms</li>
								<li>Your violation of any third-party rights</li>
								<li>Your violation of TikTok&apos;s Terms of Service</li>
							</ul>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>12. Account Termination</h2>
							<p>You may terminate your use of the Service at any time by:</p>
							<ul style={{ listStyle: "disc", marginLeft: 20, display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
								<li>Revoking TikTok API access through our app or TikTok settings</li>
								<li>Requesting account deletion by contacting us</li>
							</ul>
							<p style={{ marginTop: 14 }}>We may terminate or suspend your access if you violate these Terms or for any reason with reasonable notice. Upon termination, your data will be deleted in accordance with our Privacy Policy.</p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>13. Modifications to Terms</h2>
							<p>We reserve the right to modify these Terms at any time. Changes will be effective upon posting to this page. Your continued use of the Service after changes constitutes acceptance of the modified Terms.</p>
							<p style={{ marginTop: 10 }}>We will notify users of significant changes via email or through the Service.</p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>14. Governing Law and Jurisdiction</h2>
							<p>These Terms are governed by the laws of France. Any disputes arising from these Terms or your use of the Service shall be subject to the exclusive jurisdiction of the courts of France.</p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>15. Severability</h2>
							<p>If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.</p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>16. Contact Information</h2>
							<p>For any questions about these Terms of Service, please contact us:</p>
							<p style={{ marginTop: 10 }}><strong>By Email:</strong> <a href="mailto:contact@mysynapsis.fr">contact@mysynapsis.fr</a></p>
							<p style={{ marginTop: 10 }}><strong>By Mail:</strong><br />MALLET Frédéric<br />1 Impasse des frênes<br />15260 Neuvéglise-Sur-Truyère<br />France</p>
							<p style={{ marginTop: 10 }}><strong>Phone:</strong> 07 59 95 10 51</p>
						</div>
					</div>

					<div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--line)" }}>
						<p style={{ fontSize: 13, color: "var(--faint)" }}>
							Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
						</p>
					</div>
				</div>
			</section>
			</main>

			<SiteFooterMinimal />
		</>
	);
}
