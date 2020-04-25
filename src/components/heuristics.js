function getTagPreferences(ridePreferences) {

	// tags per ride included in survey
	// corresponds to each ride in survey
	const rideTags = [
		['thrill rides', 'small drops', 'dark'],
		['thrill rides', 'water rides', 'big drops'],
		['thrill rides', 'spinning', 'dark'],
		['thrill rides', 'small drops'],
		['thrill rides', 'big drops', 'loud'],
		['slow rides', 'spinning'],
		['thrill rides', 'water rides', 'small drops'],
		['thrill rides', 'big drops', 'dark', 'scary'],
		['thrill rides', 'small drops', 'dark', 'scary'],
		['stage show'],
		['spinning', 'interactive']
	]

	// totals of tags included in survey rides
	const tagTotals = {'thrill rides': 0, 'water rides': 0, 
	'big drops': 0,	'small drops': 0, 'dark': 0, 'loud': 0,
	'scary': 0,	'interactive': 0, 'spinning': 0, 'stage show': 0,
	'slow rides': 0}

	let tagPreferences = {'thrill rides': 0, 'water rides': 0, 
	'big drops': 0,	'small drops': 0, 'dark': 0, 'loud': 0,
	'scary': 0,	'interactive': 0, 'spinning': 0, 'stage show': 0,
	'slow rides': 0}
	
	// calculate tag values based on user ride preferences
	// ride preferences calculated from decision tree(s)
	for (let i = 0; i < ridePreferences.length; i++) {
		for (const tag of rideTags[i]) {
			if (ridePreferences[i] == 1) {
				tagPreferences[tag]++
			}
			tagTotals[tag]++;
		}
	}

	// calculate percentage of each tag from its total
	for (const tag2 in tagTotals){
		tagPreferences[tag2]/=tagTotals[tag2];
	}

	return tagPreferences
}

export function getPreferredRides(ridePreferences, crowdLevel, rides) {

	let tagPreferences = getTagPreferences(ridePreferences);

	// for all rides at the park selected
	// calculate the preference for each ride
	for (let ride of rides){
		const rideTags = ride.tags.split(',');
		let preference = 0;
		for (const tag of rideTags){
			preference += tagPreferences[tag]
		}
		ride.preference = preference/rideTags.length;
	}

	// sort the rides by their preference
	// take the top 5 rides 
	rides.sort((a, b) => (a.preference < b.preference) ? 1 : -1)
	rides = rides.slice(0,5);

	// include wait time only for the relevant crowd level
	for (let ride of rides){
		if (crowdLevel == 'very Quiet') {
			ride.wait = ride.very_quiet_wait;
		} else if (crowdLevel == 'Moderately Quiet') {
			ride.wait = ride.moderately_quiet_wait;
		} else if (crowdLevel == 'Moderately Busy') {
			ride.wait = ride.moderately_busy_wait;
		} else {
			ride.wait = ride.very_busy_wait;
		}
	}

	return rides;
}