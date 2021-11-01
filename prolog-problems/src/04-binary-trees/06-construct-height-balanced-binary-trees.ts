// In a height-balanced binary tree, the following property holds for
// 	every node: The height of its left subtree and the height of  
// 	its right subtree are almost equal, which means their
// 	difference is not greater than one.
// 
// 	Write a predicate hbal_tree/2 to construct height-balanced
// 	binary trees for a given height. The predicate should
// 	generate all solutions via backtracking. Put the letter 'x'
// 	as information into all nodes of the tree.
// 	Example:
// 	?- hbal_tree(3,T).
// 	T = t(x, t(x, t(x, nil, nil), t(x, nil, nil)), t(x, t(x, nil, nil), 
// 	t(x, nil, nil))) ;
//         T = t(x, t(x, t(x, nil, nil), t(x, nil, nil)), t(x, t(x, nil, nil),
// 	nil)) ;
//      
// 	etc......No
// 
// 