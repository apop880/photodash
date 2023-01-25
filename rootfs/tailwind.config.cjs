const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},
	daisyui: {
		themes: [
			{
			  'photodash': {
				 'accent' : '#3e9ff9',
				 'accent-focus' : '#6765c8',
				 'accent-content' : '#000000',
	  
				 'secondary' : '#707070',
				 'secondary-focus' : '#555355',
				 'secondary-content' : '#ffffff',
	  
				 'primary' : '#378b82',
				 'primary-focus' : '#2ba69a',
				 'primary-content' : '#000000',
	  
				 'neutral' : '#2a2e37',
				 'neutral-focus' : '#16181d',
				 'neutral-content' : '#ffffff',
	  
				 'base-100' : '#3b424e',
				 'base-200' : '#2a2e37',
				 'base-300' : '#16181d',
				 'base-content' : '#ebecf0',
	  
				 'info' : '#66c7ff',
				 'success' : '#87cf3a',
				 'warning' : '#e1d460',
				 'error' : '#ff6b6b',
	  
				'--rounded-box': '1rem',          
				'--rounded-btn': '0.5rem',        
				'--rounded-badge': '1.9rem',      
	  
				'--animation-btn': '0.25s',       
				'--animation-input': '0.2s',       
	  
				'--btn-text-case': 'uppercase',   
				'--navbar-padding': '0.5rem',      
				'--border-btn': '1px',            
			  },
			},
		  ],
	  },
	plugins: [require('@tailwindcss/typography'), require("daisyui")]
};

module.exports = config;
