// Use the predicate add/3, developed in chapter 4 of the course,
// 	to write a predicate to construct a binary search tree 
// 	from a list of integer numbers.
// 	Example:
// 	?- construct([3,2,5,7,1],T).
// 	T = t(3, t(2, t(1, nil, nil), nil), t(5, nil, t(7, nil, nil)))
// 
// 	Then use this predicate to test the solution of the problem P56.
//  	Example:
// 	?- test_symmetric([5,3,18,1,4,12,21]).
// 	Yes
// 	?- test_symmetric([3,2,5,7,4]).
// 	No
// 
// 