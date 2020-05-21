import Container from "./container"
import Link from "next/link"
import withPure from "./hoc/pure"

export default withPure(() => (
	<Container wide dark>
		<Container>
			<footer>
				<style jsx>
					{`
						footer {
							padding: 2rem 0 4rem;
							min-height: 400px;
						}
						a,
						p,
						.copyright {
							color: #8c8c8c;
						}
						h4 a {
							color: inherit;
						}
						a:hover {
							color: #ff851b;
						}
						.copyright {
							margin-top: 3rem;
						}
						.copyright div {
							margin-top: 0.5rem;
						}
						.row {
							align-items: flex-start;
						}
						h4 {
							margin-bottom: 0.75rem;
						}
						p {
							margin-top: 0;
							margin-bottom: 0.25rem;
						}
						* + h4 {
							margin-top: 1rem;
						}
						// CSS only media query for mobile
						@media screen and (max-width: 640px) {
							footer .column {
								flex: 1 1 120px;
							}
							footer .row {
								flex-direction: row;
								flex-wrap: wrap;
							}
						}
					`}
				</style>
				<div className="row f5">
					<div className="column">
						<h4 className="fw5">Social</h4>
						<p>
							<a
								href="https://instagram.com/NetherGamesMC"
								rel="noreferrer"
								target="_blank"
							>
								Instagram
							</a>
						</p>
						<p>
							<a
								href="https://facebook.com/NetherGamesMC"
								rel="noreferrer"
								target="_blank"
							>
								Facebook
							</a>
						</p>
						<p>
							<a
								href="https://twitter.com/NetherGamesMC"
								rel="noreferrer"
								target="_blank"
							>
								Twitter
							</a>
						</p>
					</div>
					<div className="column">
						<h4 className="fw5">Support</h4>
						<p>
							<a href="https://ngmc.co/s" rel="noreferrer" target="_blank">
								Helpdesk
							</a>
						</p>
						<p>
							<a href="https://ngmc.co/lc" rel="noreferrer" target="_blank">
								Live Chat Support
							</a>
						</p>
						<p>
							<a href="https://ngmc.co/d" rel="noreferrer" target="_blank">
								Discord Server
							</a>
						</p>
					</div>
					<div className="column">
						<h4 className="fw5">Legal</h4>
						<p>
							<a href="https://ngmc.co/tac" rel="noreferrer" target="_blank">
								Terms and Conditions
							</a>
						</p>
						<p>
							<a href="https://ngmc.co/pp" rel="noreferrer" target="_blank">
								Data & Privacy Policy
							</a>
						</p>
						<p>
							<a href="https://ngmc.co/rrp" rel="noreferrer" target="_blank">
								Ranks & Refunds Policy
							</a>
						</p>
					</div>
				</div>
				<div className="copyright f6">
					<a href="#" rel="noreferrer" target="_blank" aria-label="NetherGames">
						<img
							height={30}
							style={{ transform: "translateX(4%)" }}
							src="https://cdn.nethergames.org/img/logo/double-line-light.png"
						/>
					</a>
					<div>
						{" "}
						Copyright © 2020 NetherGames Network (ABN 72 871 552 173). All
						rights reserved.
						<br />
						All trademarks are property of their respective owners.
						<br />
						<img
							src="https://status.nethergames.org/includes/badge"
							style={{
								height: "8px",
								marginBottom: "1px",
								borderRadius: "100%",
							}}
						/>{" "}
						<a href="https://status.nethergames.org">Network Status</a> |{" "}
						<a href="https://live.nethergames.org">Minecraft Server Status</a> |{" "}
						<a href="https://account.nethergames.org/account.php">
							Account Dashboard
						</a>{" "}
						|{" "}
						<a href="http://cdn.nethergames.org/assets/mediakit.zip">
							Media Kit
						</a>
					</div>
				</div>
			</footer>
		</Container>
	</Container>
))
