import React from 'react';

const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<footer className="footer">
			<div className="footer-container">
				<p>&copy; {year} Warzywniaka. Wszystkie prawa zastrzeżone.</p>
				<div className="footer-links">
					<a href="#" onClick={(e) => e.preventDefault()}>Polityka prywatności</a>
					<a href="#" onClick={(e) => e.preventDefault()}>Regulamin</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
