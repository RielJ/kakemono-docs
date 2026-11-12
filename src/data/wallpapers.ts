// The wallpapers in the home page demo. All are CC0 photos that their authors
// published on Unsplash, mirrored on Wikimedia Commons (Category:Images from Unsplash).
// Files: src/assets/wallpapers/<slug>.jpg, resized to 2400 px wide.

export interface Wallpaper {
	slug: string;
	title: string;
	author: string;
	/** The Wikimedia Commons file page, which records the CC0 licence. */
	source: string;
}

export const wallpapers = [
	{
		slug: 'aurora',
		title: 'Lofoten, Norway',
		author: 'Johannes Groll',
		source: 'https://commons.wikimedia.org/wiki/File:Lofoten,_Norway_(Unsplash).jpg',
	},
	{
		slug: 'lake',
		title: 'Mountain lake',
		author: 'Aleksandra Boguslawska',
		source: 'https://commons.wikimedia.org/wiki/File:Mountain_lake_(Unsplash).jpg',
	},
	{
		slug: 'dunes',
		title: 'Desert dunes, New Mexico',
		author: 'Breanna Galley',
		source: 'https://commons.wikimedia.org/wiki/File:Desert_Dunes_in_New_Mexico_(Unsplash).jpg',
	},
	{
		slug: 'harbour',
		title: 'City lights at night',
		author: 'Alex Wong',
		source: 'https://commons.wikimedia.org/wiki/File:City_Lights_at_Night_(Unsplash_-uzgaA9LfNw).jpg',
	},
	{
		slug: 'fog',
		title: 'Fog above a forest',
		author: 'Thomas Griesbeck',
		source: 'https://commons.wikimedia.org/wiki/File:Heavy_fog_above_a_forest_(Unsplash).jpg',
	},
	{
		slug: 'shore',
		title: 'Palm Coast beach from above',
		author: 'Lance Asper',
		source: 'https://commons.wikimedia.org/wiki/File:Ocean_waves_drone_view_of_Palm_Coast_beach.jpg',
	},
	{
		slug: 'moraine',
		title: 'Ripples on a mountain lake',
		author: 'Braxton Stuntz',
		source: 'https://commons.wikimedia.org/wiki/File:Ripples_on_a_mountain_lake_(Unsplash).jpg',
	},
	{
		slug: 'desert-night',
		title: 'Desert skies',
		author: 'Jared Evans',
		source: 'https://commons.wikimedia.org/wiki/File:Desert_Skies_(Unsplash).jpg',
	},
	{
		slug: 'andes',
		title: 'Snowy peaks',
		author: 'Marcelo Quinan',
		source: 'https://commons.wikimedia.org/wiki/File:Snow_mountain_unsplash.jpg',
	},
	{
		slug: 'clouds',
		title: 'Clouds above the ocean',
		author: 'Ben Duchac',
		source: 'https://commons.wikimedia.org/wiki/File:Clouds_above_ocean_drone_view_(Unsplash).jpg',
	},
] as const satisfies readonly Wallpaper[];
