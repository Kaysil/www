import Container from "../container"
import WordSlider from "../word-slider"

export default () => (
	<div className="slider-container">
		<WordSlider duration={1800}>
			<span>Bedwars</span>
			<span>Creative</span>
			<span>Duels</span>
			<span>Factions</span>
			<span>Murder Mystery</span>
			<span>Skyblock</span>
			<span>SkyWars</span>
			<span>The Bridge</span>
			<span>And more!</span>
		</WordSlider>
		<style jsx>{`
			.slider-container {
				margin: auto;
				margin-top: 0;
				margin-bottom: -1rem;
				line-height: 1.4em;
				white-space: nowrap;
			}
		`}</style>
	</div>
)
