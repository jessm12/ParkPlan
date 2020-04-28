function findMax(nums) {
	var index = 0;
	for (var i = 0; i < nums.length; i++) {
		index = nums[i] > nums[index] ? i : index;
	}
	return index;
}

function predict(features, tree, node) {
	node = (typeof node !== 'undefined') ? node : 0;
	if (tree.thresholds[node] != -2) {
		if (features[tree.indices[node]] <= tree.thresholds[node]) {
			return predict(features, tree, tree.lChilds[node]);
		} else {
			return predict(features, tree, tree.rChilds[node]);
		}
	}
	return findMax(tree.classes[node]);
}

export function classify(features) {
	const results = [];

	// trees data from the constructed decision trees exported from python
	const trees = [
		{
			lChilds: [1, 2, 3, -1, -1, 6, -1, 8, 9, 10, -1, -1, 13, -1, 15, -1, -1, -1, 19, -1, 21, -1, -1],
			rChilds: [18, 5, 4, -1, -1, 7, -1, 17, 12, 11, -1, -1, 14, -1, 16, -1, -1, -1, 20, -1, 22, -1, -1],
			thresholds: [17.5, 45.0, 0.5, -2.0, -2.0, 14.5, -2.0, 4.5, 3.5, 0.5, -2.0, -2.0, 24.5, -2.0, 16.5, -2.0, -2.0, -2.0, 40.0, -2.0, 43.5, -2.0, -2.0],
			indices: [3, 4, 0, -2, -2, 3, -2, 1, 1, 0, -2, -2, 2, -2, 3, -2, -2, -2, 2, -2, 2, -2, -2],
			classes: [[81, 9], [15, 8], [7, 1], [7, 0], [0, 1], [8, 7], [0, 3], [8, 4], [3, 4], [2, 1], [0, 1], [2, 0], [1, 3], [0, 2], [1, 1], [1, 0], [0, 1], [5, 0], [66, 1], [64, 0], [2, 1], [0, 1], [2, 0]]
		},
		{
			lChilds: [1, 2, 3, 4, 5, 6, 7, 8, -1, -1, 11, 12, 13, -1, 15, -1, 17, -1, -1, -1, -1, 22, -1, -1, -1, 26, 27, -1, -1, -1, -1, -1, 33, -1, 35, 36, 37, -1, 39, 40, 41, 42, -1, -1, -1, -1, -1, 48, -1, 50, -1, -1, 53, -1, -1],
			rChilds: [32, 31, 30, 25, 24, 21, 10, 9, -1, -1, 20, 19, 14, -1, 16, -1, 18, -1, -1, -1, -1, 23, -1, -1, -1, 29, 28, -1, -1, -1, -1, -1, 34, -1, 52, 47, 38, -1, 46, 45, 44, 43, -1, -1, -1, -1, -1, 49, -1, 51, -1, -1, 54, -1, -1],
			thresholds: [45.0, 30.0, 26.5, 23.0, 5.5, 21.5, 3.5, 18.0, -2.0, -2.0, 4.5, 2.5, 17.0, -2.0, 18.5, -2.0, 20.5, -2.0, -2.0, -2.0, -2.0, 5.5, -2.0, -2.0, -2.0, 0.5, 25.5, -2.0, -2.0, -2.0, -2.0, -2.0, 0.5, -2.0, 35.5, 20.5, 19.5, -2.0, 90.0, 3.5, 18.5, 0.5, -2.0, -2.0, -2.0, -2.0, -2.0, 25.0, -2.0, 2.0, -2.0, -2.0, 19.0, -2.0, -2.0],
			indices: [4, 2, 2, 3, 1, 2, 1, 2, -2, -2, 1, 5, 3, -2, 3, -2, 2, -2, -2, -2, -2, 3, -2, -2, -2, 5, 2, -2, -2, -2, -2, -2, 5, -2, 2, 2, 2, -2, 4, 1, 3, 0, -2, -2, -2, -2, -2, 3, -2, 5, -2, -2, 3, -2, -2],
			classes: [[24, 66], [19, 21], [19, 15], [15, 15], [14, 10], [14, 8], [7, 7], [1, 5], [1, 0], [0, 5], [6, 2], [3, 2], [2, 2], [1, 0], [1, 2], [0, 1], [1, 1], [1, 0], [0, 1], [1, 0], [3, 0], [7, 1], [0, 1], [7, 0], [0, 2], [1, 5], [1, 1], [0, 1], [1, 0], [0, 4], [4, 0], [0, 6], [5, 45], [1, 0], [4, 45], [3, 43], [2, 8], [0, 5], [2, 3], [2, 2], [1, 2], [1, 1], [0, 1], [1, 0], [0, 1], [1, 0], [0, 1], [1, 35], [0, 32], [1, 3], [0, 3], [1, 0], [1, 2], [1, 0], [0, 2]],
		},
		{
			lChilds: [1, 2, 3, 4, -1, 6, -1, 8, 9, 10, -1, 12, 13, 14, -1, -1, -1, 18, -1, 20, -1, 22, -1, 24, -1, 26, -1, -1, -1, -1, -1, 32, -1, 34, -1, 36, -1, -1, 39, 40, 41, -1, -1, -1, 45, 46, 47, 48, -1, 50, -1, 52, 53, 54, -1, -1, -1, -1, 59, -1, -1, 62, 63, 64, -1, -1, -1, 68, -1, -1, 71, -1, 73, -1, -1],
			rChilds: [38, 31, 30, 5, -1, 7, -1, 29, 28, 11, -1, 17, 16, 15, -1, -1, -1, 19, -1, 21, -1, 23, -1, 25, -1, 27, -1, -1, -1, -1, -1, 33, -1, 35, -1, 37, -1, -1, 44, 43, 42, -1, -1, -1, 70, 61, 58, 49, -1, 51, -1, 57, 56, 55, -1, -1, -1, -1, 60, -1, -1, 67, 66, 65, -1, -1, -1, 69, -1, -1, 72, -1, 74, -1, -1],
			thresholds: [21.5, 4.5, 20.5, 16.5, -2.0, 19.5, -2.0, 105.0, 75.0, 0.5, -2.0, 1.5, 2.5, 0.5, -2.0, -2.0, -2.0, 45.0, -2.0, 20.5, -2.0, 19.5, -2.0, 2.5, -2.0, 0.5, -2.0, -2.0, -2.0, -2.0, -2.0, 15.0, -2.0, 2.5, -2.0, 18.5, -2.0, -2.0, 15.5, 45.0, 23.0, -2.0, -2.0, -2.0, 26.5, 45.0, 4.5, 21.5, -2.0, 24.5, -2.0, 1.5, 25.5, 25.5, -2.0, -2.0, -2.0, -2.0, 1.5, -2.0, -2.0, 23.0, 16.5, 26.5, -2.0, -2.0, -2.0, 2.0, -2.0, -2.0, 30.0, -2.0, 35.0, -2.0, -2.0],
			indices: [2, 1, 3, 2, -2, 2, -2, 4, 4, 5, -2, 5, 1, 0, -2, -2, -2, 4, -2, 2, -2, 3, -2, 1, -2, 0, -2, -2, -2, -2, -2, 3, -2, 5, -2, 3, -2, -2, 3, 4, 2, -2, -2, -2, 3, 4, 1, 3, -2, 2, -2, 5, 3, 2, -2, -2, -2, -2, 5, -2, -2, 3, 3, 2, -2, -2, -2, 5, -2, -2, 2, -2, 3, -2, -2],
			classes: [[35, 55], [18, 16], [16, 9], [13, 9], [0, 1], [13, 8], [4, 0], [9, 8], [9, 7], [7, 7], [1, 0], [6, 7], [2, 4], [2, 1], [0, 1], [2, 0], [0, 3], [4, 3], [2, 0], [2, 3], [0, 1], [2, 2], [0, 1], [2, 1], [1, 0], [1, 1], [0, 1], [1, 0], [2, 0], [0, 1], [3, 0], [2, 7], [1, 0], [1, 7], [0, 5], [1, 2], [1, 0], [0, 2], [17, 39], [5, 3], [2, 3], [2, 0], [0, 3], [3, 0], [12, 36], [9, 35], [6, 12], [3, 11], [0, 5], [3, 6], [1, 0], [2, 6], [2, 3], [2, 1], [0, 1], [2, 0], [0, 2], [0, 3], [3, 1], [3, 0], [0, 1], [3, 23], [1, 21], [1, 3], [0, 3], [1, 0], [0, 18], [2, 2], [0, 2], [2, 0], [3, 1], [2, 0], [1, 1], [0, 1], [1, 0]]
		},
		{
			lChilds: [1, 2, 3, 4, -1, 6, -1, -1, 9, 10, -1, 12, -1, -1, 15, -1, 17, 18, 19, -1, 21, 22, -1, -1, -1, 26, 27, 28, 29, -1, -1, 32, 33, -1, 35, 36, -1, -1, -1, 40, -1, -1, -1, 44, -1, -1, 47, -1, -1, 50, 51, 52, -1, -1, -1, -1, 57, -1, 59, 60, -1, 62, -1, 64, -1, -1, -1],
			rChilds: [56, 49, 8, 5, -1, 7, -1, -1, 14, 11, -1, 13, -1, -1, 16, -1, 46, 25, 20, -1, 24, 23, -1, -1, -1, 43, 42, 31, 30, -1, -1, 39, 34, -1, 38, 37, -1, -1, -1, 41, -1, -1, -1, 45, -1, -1, 48, -1, -1, 55, 54, 53, -1, -1, -1, -1, 58, -1, 66, 61, -1, 63, -1, 65, -1, -1, -1],
			thresholds: [29.5, 5.5, 0.5, 4.5, -2.0, 21.5, -2.0, -2.0, 16.5, 45.0, -2.0, 3.5, -2.0, -2.0, 18.5, -2.0, 1.5, 19.5, 1.5, -2.0, 20.5, 45.0, -2.0, -2.0, -2.0, 24.5, 22.5, 0.5, 2.5, -2.0, -2.0, 21.5, 3.5, -2.0, 45.0, 2.0, -2.0, -2.0, -2.0, 2.5, -2.0, -2.0, -2.0, 45.0, -2.0, -2.0, 25.5, -2.0, -2.0, 7.5, 8.5, 6.5, -2.0, -2.0, -2.0, -2.0, 0.5, -2.0, 1.5, 32.5, -2.0, 45.0, -2.0, 2.5, -2.0, -2.0, -2.0],
			indices: [2, 1, 5, 1, -2, 2, -2, -2, 3, 4, -2, 1, -2, -2, 3, -2, 0, 3, 5, -2, 2, 4, -2, -2, -2, 3, 2, 0, 1, -2, -2, 2, 1, -2, 4, 5, -2, -2, -2, 5, -2, -2, -2, 4, -2, -2, 3, -2, -2, 1, 3, 3, -2, -2, -2, -2, 5, -2, 5, 2, -2, 4, -2, 1, -2, -2, -2],
			classes: [[43, 47], [40, 35], [38, 25], [1, 4], [0, 3], [1, 1], [1, 0], [0, 1], [37, 21], [5, 6], [4, 0], [1, 6], [1, 0], [0, 6], [32, 15], [6, 0], [26, 15], [23, 10], [2, 4], [0, 2], [2, 2], [1, 2], [1, 0], [0, 2], [1, 0], [21, 6], [19, 3], [11, 3], [1, 1], [1, 0], [0, 1], [10, 2], [9, 1], [6, 0], [3, 1], [1, 1], [0, 1], [1, 0], [2, 0], [1, 1], [0, 1], [1, 0], [8, 0], [2, 3], [0, 3], [2, 0], [3, 5], [0, 5], [3, 0], [2, 10], [1, 10], [1, 1], [0, 1], [1, 0], [0, 9], [1, 0], [3, 12], [1, 0], [2, 12], [2, 5], [0, 2], [2, 3], [1, 0], [1, 3], [1, 0], [0, 3], [0, 7]]
		},
		{
			lChilds: [1, 2, 3, 4, 5, -1, 7, -1, 9, -1, 11, 12, 13, -1, 15, -1, -1, -1, 19, -1, -1, -1, 23, -1, 25, -1, -1, -1, 29, -1, 31, -1, 33, 34, 35, -1, 37, -1, -1, 40, 41, 42, 43, -1, 45, -1, -1, 48, 49, -1, -1, -1, 53, 54, -1, -1, -1, 58, -1, -1, -1],
			rChilds: [28, 27, 22, 21, 6, -1, 8, -1, 10, -1, 18, 17, 14, -1, 16, -1, -1, -1, 20, -1, -1, -1, 24, -1, 26, -1, -1, -1, 30, -1, 32, -1, 60, 39, 36, -1, 38, -1, -1, 57, 52, 47, 44, -1, 46, -1, -1, 51, 50, -1, -1, -1, 56, 55, -1, -1, -1, 59, -1, -1, -1],
			thresholds: [45.0, 30.0, 2.5, 1.5, 19.5, -2.0, 0.5, -2.0, 0.5, -2.0, 23.5, 1.5, 3.5, -2.0, 19.5, -2.0, -2.0, -2.0, 26.5, -2.0, -2.0, -2.0, 1.5, -2.0, 21.5, -2.0, -2.0, -2.0, 0.5, -2.0, 8.5, -2.0, 27.5, 19.5, 15.5, -2.0, 16.5, -2.0, -2.0, 35.5, 3.5, 75.0, 23.0, -2.0, 25.0, -2.0, -2.0, 2.5, 20.5, -2.0, -2.0, -2.0, 21.5, 5.5, -2.0, -2.0, -2.0, 36.5, -2.0, -2.0, -2.0],
			indices: [4, 2, 5, 5, 2, -2, 0, -2, 5, -2, 2, 0, 1, -2, 3, -2, -2, -2, 2, -2, -2, -2, 0, -2, 3, -2, -2, -2, 5, -2, 3, -2, 3, 2, 3, -2, 3, -2, -2, 2, 1, 4, 3, -2, 3, -2, -2, 1, 3, -2, -2, -2, 2, 1, -2, -2, -2, 2, -2, -2, -2],
			classes: [[30, 60], [20, 20], [20, 14], [19, 8], [13, 8], [0, 2], [13, 6], [4, 0], [9, 6], [3, 0], [6, 6], [5, 2], [5, 1], [3, 0], [2, 1], [2, 0], [0, 1], [0, 1], [1, 4], [0, 4], [1, 0], [6, 0], [1, 6], [0, 5], [1, 1], [1, 0], [0, 1], [0, 6], [10, 40], [1, 0], [9, 40], [1, 0], [8, 40], [7, 40], [2, 3], [0, 2], [2, 1], [2, 0], [0, 1], [5, 37], [4, 35], [3, 12], [1, 11], [0, 9], [1, 2], [1, 0], [0, 2], [2, 1], [1, 1], [0, 1], [1, 0], [1, 0], [1, 23], [1, 5], [0, 5], [1, 0], [0, 18], [1, 2], [1, 0], [0, 2], [1, 0]]
		},
		{
			lChilds: [1, 2, 3, 4, 5, -1, -1, 8, 9, -1, 11, 12, 13, -1, 15, 16, -1, 18, 19, -1, -1, 22, -1, -1, -1, -1, 27, 28, -1, 30, -1, 32, -1, -1, -1, 36, 37, 38, 39, -1, 41, -1, -1, -1, -1, 46, -1, -1, -1, 50, 51, -1, -1, -1, 55, 56, -1, -1, -1],
			rChilds: [54, 49, 48, 7, 6, -1, -1, 35, 10, -1, 26, 25, 14, -1, 24, 17, -1, 21, 20, -1, -1, 23, -1, -1, -1, -1, 34, 29, -1, 31, -1, 33, -1, -1, -1, 45, 44, 43, 40, -1, 42, -1, -1, -1, -1, 47, -1, -1, -1, 53, 52, -1, -1, -1, 58, 57, -1, -1, -1],
			thresholds: [34.0, 6.5, 29.5, 7.0, 5.5, -2.0, -2.0, 3.5, 18.0, -2.0, 25.5, 20.5, 19.0, -2.0, 75.0, 20.5, -2.0, 45.0, 2.5, -2.0, -2.0, 2.5, -2.0, -2.0, -2.0, -2.0, 1.5, 1.5, -2.0, 45.0, -2.0, 27.5, -2.0, -2.0, -2.0, 5.5, 20.5, 45.0, 18.5, -2.0, 4.5, -2.0, -2.0, -2.0, -2.0, 2.5, -2.0, -2.0, -2.0, 23.0, 16.5, -2.0, -2.0, -2.0, 75.0, 2.5, -2.0, -2.0, -2.0],
			indices: [2, 1, 3, 3, 3, -2, -2, 1, 2, -2, 2, 3, 3, -2, 4, 2, -2, 4, 1, -2, -2, 1, -2, -2, -2, -2, 5, 0, -2, 4, -2, 3, -2, -2, -2, 1, 2, 4, 3, -2, 1, -2, -2, -2, -2, 5, -2, -2, -2, 2, 3, -2, -2, -2, 4, 1, -2, -2, -2],
			classes: [[71, 19], [67, 14], [64, 11], [64, 10], [2, 2], [2, 0], [0, 2], [62, 8], [27, 6], [0, 1], [27, 5], [20, 2], [10, 2], [5, 0], [5, 2], [3, 2], [1, 0], [2, 2], [1, 1], [1, 0], [0, 1], [1, 1], [0, 1], [1, 0], [2, 0], [10, 0], [7, 3], [3, 3], [0, 2], [3, 1], [2, 0], [1, 1], [0, 1], [1, 0], [4, 0], [35, 2], [31, 1], [10, 1], [4, 1], [3, 0], [1, 1], [1, 0], [0, 1], [6, 0], [21, 0], [4, 1], [4, 0], [0, 1], [0, 1], [3, 3], [3, 1], [0, 1], [3, 0], [0, 2], [4, 5], [2, 5], [2, 0], [0, 5], [2, 0]]
		},
		{
			lChilds: [1, 2, 3, 4, 5, 6, -1, 8, -1, -1, 11, 12, -1, 14, -1, 16, 17, -1, -1, 20, -1, -1, -1, 24, 25, -1, 27, 28, -1, 30, -1, -1, -1, 34, -1, -1, 37, -1, 39, 40, -1, 42, 43, -1, -1, 46, 47, 48, 49, 50, -1, 52, 53, -1, -1, -1, -1, 58, -1, 60, -1, -1, -1, -1, 65, -1, -1, 68, -1, 70, -1, -1, 73, -1, 75, -1, -1],
			rChilds: [72, 67, 36, 23, 10, 7, -1, 9, -1, -1, 22, 13, -1, 15, -1, 19, 18, -1, -1, 21, -1, -1, -1, 33, 26, -1, 32, 29, -1, 31, -1, -1, -1, 35, -1, -1, 38, -1, 64, 41, -1, 45, 44, -1, -1, 63, 62, 57, 56, 51, -1, 55, 54, -1, -1, -1, -1, 59, -1, 61, -1, -1, -1, -1, 66, -1, -1, 69, -1, 71, -1, -1, 74, -1, 76, -1, -1],
			thresholds: [26.5, 5.5, 2.5, 1.5, 19.5, 45.0, -2.0, 0.5, -2.0, -2.0, 90.0, 1.5, -2.0, 0.5, -2.0, 23.5, 45.0, -2.0, -2.0, 45.0, -2.0, -2.0, -2.0, 24.5, 20.5, -2.0, 23.0, 2.5, -2.0, 1.5, -2.0, -2.0, -2.0, 45.0, -2.0, -2.0, 3.5, -2.0, 24.5, 0.5, -2.0, 17.0, 16.5, -2.0, -2.0, 105.0, 21.0, 45.0, 2.5, 0.5, -2.0, 20.5, 4.5, -2.0, -2.0, -2.0, -2.0, 2.5, -2.0, 19.5, -2.0, -2.0, -2.0, -2.0, 0.5, -2.0, -2.0, 20.0, -2.0, 1.5, -2.0, -2.0, 21.5, -2.0, 22.5, -2.0, -2.0],
			indices: [2, 1, 1, 5, 3, 4, -2, 0, -2, -2, 4, 0, -2, 5, -2, 3, 4, -2, -2, 4, -2, -2, -2, 3, 3, -2, 2, 5, -2, 0, -2, -2, -2, 4, -2, -2, 1, -2, 2, 0, -2, 3, 2, -2, -2, 4, 3, 4, 5, 5, -2, 2, 1, -2, -2, -2, -2, 5, -2, 3, -2, -2, -2, -2, 5, -2, -2, 3, -2, 5, -2, -2, 3, -2, 3, -2, -2],
			classes: [[32, 58], [30, 37], [29, 27], [14, 8], [6, 6], [1, 3], [0, 2], [1, 1], [0, 1], [1, 0], [5, 3], [5, 2], [2, 0], [3, 2], [1, 0], [2, 2], [1, 1], [1, 0], [0, 1], [1, 1], [0, 1], [1, 0], [0, 1], [8, 2], [7, 1], [3, 0], [4, 1], [2, 1], [1, 0], [1, 1], [0, 1], [1, 0], [2, 0], [1, 1], [0, 1], [1, 0], [15, 19], [0, 8], [15, 11], [14, 8], [3, 0], [11, 8], [1, 3], [1, 0], [0, 3], [10, 5], [10, 4], [8, 4], [4, 3], [2, 3], [0, 1], [2, 2], [1, 2], [0, 2], [1, 0], [1, 0], [2, 0], [4, 1], [3, 0], [1, 1], [1, 0], [0, 1], [2, 0], [0, 1], [1, 3], [1, 0], [0, 3], [1, 10], [0, 8], [1, 2], [0, 2], [1, 0], [2, 21], [0, 14], [2, 7], [2, 0], [0, 7]]
		},
		{
			lChilds: [1, 2, -1, 4, -1, -1, 7, 8, 9, 10, 11, -1, 13, 14, 15, -1, -1, -1, -1, 20, 21, -1, 23, 24, -1, -1, 27, -1, -1, 30, 31, 32, -1, -1, -1, -1, 37, -1, 39, -1, -1, -1, 43, 44, 45, -1, 47, 48, 49, -1, 51, -1, 53, -1, 55, -1, -1, 58, -1, -1, 61, -1, 63, 64, -1, -1, -1, -1, 69, -1, 71, -1, 73, -1, -1],
			rChilds: [6, 3, -1, 5, -1, -1, 42, 41, 36, 19, 12, -1, 18, 17, 16, -1, -1, -1, -1, 29, 22, -1, 26, 25, -1, -1, 28, -1, -1, 35, 34, 33, -1, -1, -1, -1, 38, -1, 40, -1, -1, -1, 68, 67, 46, -1, 60, 57, 50, -1, 52, -1, 54, -1, 56, -1, -1, 59, -1, -1, 62, -1, 66, 65, -1, -1, -1, -1, 70, -1, 72, -1, 74, -1, -1],
			thresholds: [15.5, 25.5, -2.0, 6.5, -2.0, -2.0, 45.0, 34.0, 1.5, 3.5, 0.5, -2.0, 22.0, 2.5, 19.0, -2.0, -2.0, -2.0, -2.0, 21.5, 0.5, -2.0, 1.5, 19.5, -2.0, -2.0, 19.5, -2.0, -2.0, 32.0, 0.5, 0.5, -2.0, -2.0, -2.0, -2.0, 0.5, -2.0, 19.5, -2.0, -2.0, -2.0, 32.5, 27.5, 0.5, -2.0, 3.5, 2.5, 2.5, -2.0, 21.5, -2.0, 22.5, -2.0, 25.0, -2.0, -2.0, 0.5, -2.0, -2.0, 5.5, -2.0, 6.5, 2.0, -2.0, -2.0, -2.0, -2.0, 3.5, -2.0, 75.0, -2.0, 4.5, -2.0, -2.0],
			indices: [3, 2, -2, 1, -2, -2, 4, 2, 0, 1, 0, -2, 2, 1, 3, -2, -2, -2, -2, 2, 5, -2, 5, 2, -2, -2, 2, -2, -2, 2, 5, 0, -2, -2, -2, -2, 5, -2, 3, -2, -2, -2, 2, 3, 5, -2, 1, 1, 5, -2, 2, -2, 3, -2, 3, -2, -2, 0, -2, -2, 1, -2, 1, 5, -2, -2, -2, -2, 1, -2, 4, -2, 1, -2, -2],
			classes: [[38, 52], [9, 2], [8, 0], [1, 2], [0, 2], [1, 0], [29, 50], [17, 17], [17, 14], [15, 10], [8, 2], [0, 1], [8, 1], [3, 1], [1, 1], [1, 0], [0, 1], [2, 0], [5, 0], [7, 8], [5, 3], [1, 0], [4, 3], [1, 2], [1, 0], [0, 2], [3, 1], [0, 1], [3, 0], [2, 5], [1, 5], [1, 1], [0, 1], [1, 0], [0, 4], [1, 0], [2, 4], [1, 0], [1, 4], [1, 0], [0, 4], [0, 3], [12, 33], [8, 30], [7, 30], [1, 0], [6, 30], [5, 11], [2, 10], [0, 7], [2, 3], [1, 0], [1, 3], [0, 2], [1, 1], [1, 0], [0, 1], [3, 1], [0, 1], [3, 0], [1, 19], [0, 13], [1, 6], [1, 1], [0, 1], [1, 0], [0, 5], [1, 0], [4, 3], [0, 2], [4, 1], [3, 0], [1, 1], [0, 1], [1, 0]]
		},
		{
			lChilds: [1, 2, 3, 4, -1, 6, 7, 8, -1, -1, -1, 12, -1, 14, -1, -1, 17, -1, 19, 20, 21, 22, -1, 24, 25, 26, -1, -1, -1, -1, -1, -1, -1, 34, -1, 36, -1, 38, 39, -1, -1, 42, -1, 44, 45, 46, -1, -1, -1, 50, 51, -1, -1, -1, 55, 56, 57, -1, 59, -1, -1, 62, 63, -1, -1, 66, -1, -1, 69, 70, -1, -1, -1],
			rChilds: [54, 33, 16, 5, -1, 11, 10, 9, -1, -1, -1, 13, -1, 15, -1, -1, 18, -1, 32, 31, 30, 23, -1, 29, 28, 27, -1, -1, -1, -1, -1, -1, -1, 35, -1, 37, -1, 41, 40, -1, -1, 43, -1, 49, 48, 47, -1, -1, -1, 53, 52, -1, -1, -1, 68, 61, 58, -1, 60, -1, -1, 65, 64, -1, -1, 67, -1, -1, 72, 71, -1, -1, -1],
			thresholds: [24.5, 1.5, 45.0, 20.5, -2.0, 4.5, 2.5, 22.0, -2.0, -2.0, -2.0, 5.5, -2.0, 12.0, -2.0, -2.0, 15.5, -2.0, 23.0, 20.5, 6.0, 0.5, -2.0, 2.5, 20.5, 0.5, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, 2.5, -2.0, 19.5, -2.0, 2.5, 19.0, -2.0, -2.0, 3.5, -2.0, 4.5, 19.5, 17.5, -2.0, -2.0, -2.0, 21.5, 90.0, -2.0, -2.0, -2.0, 25.5, 4.5, 36.5, -2.0, 2.5, -2.0, -2.0, 45.0, 10.0, -2.0, -2.0, 34.0, -2.0, -2.0, 2.5, 35.0, -2.0, -2.0, -2.0],
			indices: [2, 5, 4, 2, -2, 1, 1, 2, -2, -2, -2, 1, -2, 3, -2, -2, 3, -2, 2, 3, 1, 5, -2, 1, 2, 0, -2, -2, -2, -2, -2, -2, -2, 5, -2, 2, -2, 1, 3, -2, -2, 1, -2, 1, 3, 3, -2, -2, -2, 2, 4, -2, -2, -2, 3, 1, 2, -2, 1, -2, -2, 4, 3, -2, -2, 2, -2, -2, 1, 3, -2, -2, -2],
			classes: [[43, 47], [32, 22], [15, 15], [9, 5], [3, 0], [6, 5], [2, 4], [2, 1], [2, 0], [0, 1], [0, 3], [4, 1], [3, 0], [1, 1], [1, 0], [0, 1], [6, 10], [0, 3], [6, 7], [4, 7], [4, 4], [4, 3], [0, 1], [4, 2], [1, 2], [1, 1], [0, 1], [1, 0], [0, 1], [3, 0], [0, 1], [0, 3], [2, 0], [17, 7], [7, 0], [10, 7], [2, 0], [8, 7], [4, 1], [0, 1], [4, 0], [4, 6], [0, 2], [4, 4], [3, 1], [1, 1], [1, 0], [0, 1], [2, 0], [1, 3], [1, 1], [1, 0], [0, 1], [0, 2], [11, 25], [5, 22], [1, 16], [0, 14], [1, 2], [1, 0], [0, 2], [4, 6], [3, 1], [0, 1], [3, 0], [1, 5], [0, 5], [1, 0], [6, 3], [6, 1], [6, 0], [0, 1], [0, 2]]
		},
		{
			lChilds: [1, 2, 3, 4, 5, -1, -1, -1, -1, 10, 11, -1, 13, 14, -1, -1, -1, 18, 19, -1, -1, -1, 23, -1, 25, 26, 27, 28, 29, -1, 31, 32, 33, -1, 35, -1, 37, -1, 39, -1, -1, -1, -1, -1, 45, 46, 47, -1, 49, -1, 51, -1, -1, 54, -1, -1, 57, -1, -1, -1, -1],
			rChilds: [22, 9, 8, 7, 6, -1, -1, -1, -1, 17, 12, -1, 16, 15, -1, -1, -1, 21, 20, -1, -1, -1, 24, -1, 60, 59, 44, 43, 30, -1, 42, 41, 34, -1, 36, -1, 38, -1, 40, -1, -1, -1, -1, -1, 56, 53, 48, -1, 50, -1, 52, -1, -1, 55, -1, -1, 58, -1, -1, -1, -1],
			thresholds: [0.5, 1.5, 30.0, 23.0, 3.0, -2.0, -2.0, -2.0, -2.0, 27.0, 7.0, -2.0, 2.5, 22.5, -2.0, -2.0, -2.0, 34.0, 3.5, -2.0, -2.0, -2.0, 16.5, -2.0, 24.5, 28.5, 45.0, 4.5, 0.5, -2.0, 20.5, 2.5, 18.5, -2.0, 19.5, -2.0, 2.5, -2.0, 3.5, -2.0, -2.0, -2.0, -2.0, -2.0, 105.0, 1.5, 6.5, -2.0, 1.5, -2.0, 18.5, -2.0, -2.0, 21.5, -2.0, -2.0, 19.5, -2.0, -2.0, -2.0, -2.0],
			indices: [0, 5, 2, 2, 1, -2, -2, -2, -2, 2, 3, -2, 1, 2, -2, -2, -2, 2, 5, -2, -2, -2, 2, -2, 3, 2, 4, 1, 5, -2, 3, 5, 3, -2, 3, -2, 1, -2, 1, -2, -2, -2, -2, -2, 4, 0, 1, -2, 5, -2, 3, -2, -2, 2, -2, -2, 3, -2, -2, -2, -2],
			classes: [[67, 23], [15, 12], [10, 4], [3, 4], [3, 1], [0, 1], [3, 0], [0, 3], [7, 0], [5, 8], [4, 2], [0, 1], [4, 1], [1, 1], [0, 1], [1, 0], [3, 0], [1, 6], [1, 2], [0, 2], [1, 0], [0, 4], [52, 11], [0, 1], [52, 10], [40, 10], [40, 9], [15, 6], [9, 6], [0, 1], [9, 5], [5, 5], [5, 3], [3, 0], [2, 3], [0, 2], [2, 1], [1, 0], [1, 1], [0, 1], [1, 0], [0, 2], [4, 0], [6, 0], [25, 3], [23, 2], [22, 1], [18, 0], [4, 1], [3, 0], [1, 1], [1, 0], [0, 1], [1, 1], [1, 0], [0, 1], [2, 1], [0, 1], [2, 0], [0, 1], [12, 0]]
		},
		{
			lChilds: [1, 2, 3, 4, -1, -1, 7, 8, 9, 10, -1, 12, -1, -1, 15, -1, 17, -1, -1, 20, -1, -1, 23, 24, 25, -1, -1, 28, 29, -1, 31, -1, 33, -1, -1, -1, 37, 38, 39, 40, -1, 42, 43, -1, -1, -1, -1, -1, 49, -1, 51, -1, -1, 54, -1, 56, -1, -1, -1],
			rChilds: [58, 53, 6, 5, -1, -1, 22, 19, 14, 11, -1, 13, -1, -1, 16, -1, 18, -1, -1, 21, -1, -1, 36, 27, 26, -1, -1, 35, 30, -1, 32, -1, 34, -1, -1, -1, 48, 47, 46, 41, -1, 45, 44, -1, -1, -1, -1, -1, 50, -1, 52, -1, -1, 55, -1, 57, -1, -1, -1],
			thresholds: [3.5, 6.5, 18.0, 4.5, -2.0, -2.0, 45.0, 5.5, 20.5, 18.5, -2.0, 4.5, -2.0, -2.0, 24.5, -2.0, 25.5, -2.0, -2.0, 0.5, -2.0, -2.0, 0.5, 16.5, 1.5, -2.0, -2.0, 21.5, 17.5, -2.0, 2.5, -2.0, 19.0, -2.0, -2.0, -2.0, 105.0, 1.5, 21.5, 20.5, -2.0, 20.5, 3.5, -2.0, -2.0, -2.0, -2.0, -2.0, 20.5, -2.0, 25.5, -2.0, -2.0, 19.0, -2.0, 1.5, -2.0, -2.0, -2.0],
			indices: [5, 1, 2, 1, -2, -2, 4, 1, 2, 3, -2, 1, -2, -2, 3, -2, 2, -2, -2, 0, -2, -2, 0, 3, 5, -2, -2, 3, 3, -2, 1, -2, 3, -2, -2, -2, 4, 5, 2, 2, -2, 3, 1, -2, -2, -2, -2, -2, 2, -2, 2, -2, -2, 3, -2, 5, -2, -2, -2],
			classes: [[66, 24], [66, 20], [64, 16], [1, 2], [0, 2], [1, 0], [63, 14], [34, 3], [33, 2], [5, 1], [4, 0], [1, 1], [0, 1], [1, 0], [28, 1], [21, 0], [7, 1], [0, 1], [7, 0], [1, 1], [1, 0], [0, 1], [29, 11], [7, 7], [4, 1], [0, 1], [4, 0], [3, 6], [2, 6], [0, 2], [2, 4], [1, 0], [1, 4], [1, 0], [0, 4], [1, 0], [22, 4], [20, 2], [8, 2], [4, 2], [3, 0], [1, 2], [1, 1], [1, 0], [0, 1], [0, 1], [4, 0], [12, 0], [2, 2], [1, 0], [1, 2], [0, 2], [1, 0], [2, 4], [0, 3], [2, 1], [2, 0], [0, 1], [0, 4]]
		},
	]

	// calculate result for each tree and return all results
	for (var i = 0; i < trees.length; i++) {
		results.push(predict(features, trees[i]));
	}
	
	return results;
}

