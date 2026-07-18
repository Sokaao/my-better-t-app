"use client";

import SiteNavMinimal from "@/components/site-nav-minimal";
import SiteFooterMinimal from "@/components/site-footer-minimal";

export default function PrivacyPolicyTrackerApp() {
	return (
		<>
			<div className="s-bg-grid" />
			<SiteNavMinimal />

			<section className="s-blk">
				<div className="s-wrap s-legal" style={{ maxWidth: 820 }}>
					<h1 style={{ marginBottom: 32 }}>Privacy Policy - Tracker App</h1>

					<div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
						<div>
							<h2 style={{ marginBottom: 14 }}>1. About This Application</h2>
							<p>Tracker App is a TikTok analytics application developed by Synapsis that allows content creators to track, analyze, and monitor the performance of their published content on TikTok.</p>
							<p style={{ marginTop: 10 }}>This Privacy Policy describes how we collect, use, store, and protect your data when using our application.</p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>2. Data Controller</h2>
							<p><strong>Company:</strong> Synapsis</p>
							<p><strong>Legal Form:</strong> Auto-entrepreneur (Sole Proprietorship)</p>
							<p><strong>Representative:</strong> Frédéric Mallet</p>
							<p><strong>Address:</strong><br />1 Impasse des frênes<br />15260 Neuvéglise-Sur-Truyère<br />France</p>
							<p><strong>SIRET:</strong> 994 245 355 00015</p>
							<p><strong>Email:</strong> <a href="mailto:contact@mysynapsis.fr">contact@mysynapsis.fr</a></p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>3. Data We Collect Through TikTok API</h2>

							<h3 style={{ margin: "20px 0 10px" }}>3.1 User Profile Data</h3>
							<p>When you authorize our application to access your TikTok account, we collect:</p>
							<ul style={{ listStyle: "disc", marginLeft: 20, display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
								<li>Open ID (unique identifier)</li>
								<li>Username and display name</li>
								<li>Profile picture URL</li>
								<li>Bio description</li>
								<li>Follower and following counts</li>
								<li>Likes count</li>
								<li>Video count</li>
							</ul>

							<h3 style={{ margin: "20px 0 10px" }}>3.2 Video and Content Data</h3>
							<p>We collect information about your published videos:</p>
							<ul style={{ listStyle: "disc", marginLeft: 20, display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
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

							<h3 style={{ margin: "20px 0 10px" }}>3.3 Analytics Data</h3>
							<p>When available through TikTok&apos;s API, we may collect:</p>
							<ul style={{ listStyle: "disc", marginLeft: 20, display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
								<li>Audience demographics</li>
								<li>Geographic distribution of viewers</li>
								<li>Traffic sources</li>
								<li>Engagement rates over time</li>
							</ul>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>4. Purpose of Data Processing</h2>
							<p>We process your data for the following purposes:</p>
							<ul style={{ listStyle: "disc", marginLeft: 20, display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
								<li><strong>Analytics Dashboard:</strong> Display your content performance metrics in an easy-to-understand format</li>
								<li><strong>Performance Tracking:</strong> Track the evolution of your content metrics over time</li>
								<li><strong>Insights Generation:</strong> Provide actionable insights to improve your content strategy</li>
								<li><strong>Historical Data:</strong> Store historical data to enable trend analysis</li>
								<li><strong>Notifications:</strong> Alert you about significant changes in your metrics (optional)</li>
								<li><strong>Service Improvement:</strong> Improve and optimize our application features</li>
							</ul>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>5. Legal Basis for Processing</h2>
							<p>We process your personal data based on:</p>
							<ul style={{ listStyle: "disc", marginLeft: 20, display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
								<li><strong>Your Consent:</strong> By connecting your TikTok account and authorizing our application</li>
								<li><strong>Contract Performance:</strong> To provide the services you requested</li>
								<li><strong>Legitimate Interest:</strong> To improve our services and ensure security</li>
							</ul>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>6. Data Retention</h2>
							<p>We retain your data according to the following policies:</p>
							<ul style={{ listStyle: "disc", marginLeft: 20, display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
								<li><strong>Account Data:</strong> Retained while your account is active</li>
								<li><strong>Analytics Data:</strong> Retained for up to 24 months to enable historical analysis</li>
								<li><strong>After Account Deletion:</strong> All personal data is deleted within 30 days</li>
							</ul>
							<p style={{ marginTop: 14 }}>You may request immediate deletion of your data at any time by contacting us.</p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>7. Data Security</h2>
							<p>We implement robust security measures to protect your data:</p>
							<ul style={{ listStyle: "disc", marginLeft: 20, display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
								<li>SSL/TLS encryption for all data transmissions</li>
								<li>Encrypted storage of sensitive data</li>
								<li>Regular security audits and updates</li>
								<li>Access controls and authentication mechanisms</li>
								<li>Secure token storage for TikTok API access</li>
							</ul>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>8. Third-Party Services</h2>
							<p>Our application may use the following third-party services:</p>
							<ul style={{ listStyle: "disc", marginLeft: 20, display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
								<li><strong>TikTok API:</strong> To access your TikTok data with your authorization</li>
								<li><strong>Hosting Provider:</strong> To host our application infrastructure</li>
								<li><strong>Analytics Services:</strong> To monitor application performance (anonymized data only)</li>
							</ul>
							<p style={{ marginTop: 14 }}>We ensure that all third-party providers comply with applicable data protection regulations.</p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>9. Your Rights (GDPR)</h2>
							<p>Under the General Data Protection Regulation (GDPR), you have the following rights:</p>
							<ul style={{ listStyle: "disc", marginLeft: 20, display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
								<li><strong>Right of Access:</strong> Obtain confirmation and a copy of your personal data</li>
								<li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
								<li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
								<li><strong>Right to Restriction:</strong> Limit the processing of your data</li>
								<li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
								<li><strong>Right to Object:</strong> Object to the processing of your data</li>
								<li><strong>Right to Withdraw Consent:</strong> Revoke your consent at any time</li>
							</ul>

							<h3 style={{ margin: "20px 0 10px" }}>How to Exercise Your Rights</h3>
							<p>To exercise any of these rights, please contact us at: <a href="mailto:contact@mysynapsis.fr">contact@mysynapsis.fr</a></p>
							<p style={{ marginTop: 10 }}>We will respond to your request within one month of receipt.</p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>10. Revoking TikTok Access</h2>
							<p>You can revoke our application&apos;s access to your TikTok account at any time:</p>
							<ul style={{ listStyle: "disc", marginLeft: 20, display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
								<li>Through our application settings</li>
								<li>Through TikTok&apos;s privacy settings (Settings → Privacy → Manage app permissions)</li>
								<li>By contacting us directly</li>
							</ul>
							<p style={{ marginTop: 14 }}>Upon revocation, we will stop collecting new data and delete your existing data within 30 days unless you request immediate deletion.</p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>11. Filing a Complaint</h2>
							<p>If you believe your data protection rights have been violated, you have the right to file a complaint with a supervisory authority:</p>
							<p style={{ marginTop: 10 }}><strong>CNIL (Commission Nationale de l&apos;Informatique et des Libertés)</strong><br />3 Place de Fontenoy<br />TSA 80715<br />75334 PARIS CEDEX 07<br />France</p>
							<p style={{ marginTop: 10 }}>Website: <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a></p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>12. Children&apos;s Privacy</h2>
							<p>Our application is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.</p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>13. International Data Transfers</h2>
							<p>Your data may be processed on servers located outside of France or the European Union. In such cases, we ensure appropriate safeguards are in place to protect your data in accordance with GDPR requirements.</p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>14. Updates to This Policy</h2>
							<p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The updated policy will be posted on this page with a new &quot;Last updated&quot; date.</p>
							<p style={{ marginTop: 10 }}>We encourage you to review this policy periodically. Continued use of our application after any changes constitutes your acceptance of the updated policy.</p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>15. Contact Information</h2>
							<p>For any questions or concerns about this Privacy Policy or our data practices, please contact us:</p>
							<p style={{ marginTop: 10 }}><strong>By Email:</strong> <a href="mailto:contact@mysynapsis.fr">contact@mysynapsis.fr</a></p>
							<p style={{ marginTop: 10 }}><strong>By Mail:</strong><br />MALLET Frédéric<br />1 Impasse des frênes<br />15260 Neuvéglise-Sur-Truyère<br />France</p>
							<p style={{ marginTop: 10 }}><strong>Phone:</strong> 07 54 08 32 58</p>
						</div>
					</div>

					<div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--line)" }}>
						<p style={{ fontSize: 13, color: "var(--faint)" }}>
							Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
						</p>
					</div>
				</div>
			</section>

			<SiteFooterMinimal />
		</>
	);
}
