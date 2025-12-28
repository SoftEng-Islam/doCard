/**
 * Google Analytics integration
 * Replace 'G-XXXXXXXXXX' with your actual Google Analytics Measurement ID
 */

declare global {
	interface Window {
		gtag?: (...args: any[]) => void;
		dataLayer?: any[];
	}
}

const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Replace with your actual GA4 Measurement ID

export const useAnalytics = () => {
	const initGA = () => {
		// Only initialize in production or when explicitly enabled
		if (import.meta.env.PROD && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
			// Create dataLayer
			window.dataLayer = window.dataLayer || [];
			window.gtag = function(...args: any[]) {
				window.dataLayer!.push(args);
			};

			// Load Google Analytics script
			const script = document.createElement('script');
			script.async = true;
			script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
			document.head.appendChild(script);

			// Initialize gtag
			window.gtag('js', new Date());
			window.gtag('config', GA_MEASUREMENT_ID, {
				page_path: window.location.pathname,
			});
		}
	};

	const trackPageView = (path: string) => {
		if (window.gtag && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
			window.gtag('config', GA_MEASUREMENT_ID, {
				page_path: path,
			});
		}
	};

	const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
		if (window.gtag && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
			window.gtag('event', eventName, eventParams);
		}
	};

	return {
		initGA,
		trackPageView,
		trackEvent,
	};
};
