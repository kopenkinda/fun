// In a completely balanced binary tree, the following property holds for
// 	every node: The number of nodes in its left subtree and the number of 
// 	nodes in its right subtree are almost equal, which means their
// 	difference is not greater than one.
// 
// 	Write a predicate cbal_tree/2 to construct completely balanced
// 	binary trees for a given number of nodes. The predicate should
// 	generate all solutions via backtracking. Put the letter 'x'
// 	as information into all nodes of the tree.
// 	Example:
// 	?- cbal_tree(4,T).
// 	T = t(x, t(x, nil, nil), t(x, nil, t(x, nil, nil))) ;
// 	T = t(x, t(x, nil, nil), t(x, t(x, nil, nil), nil)) ;
// 	etc......No
// 
// 