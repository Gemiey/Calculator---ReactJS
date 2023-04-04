previous and current operand initialized as null

when a new digit is clicked, it is concatenated to the current operand

when an operation is clicked, it is concatenated to current operand then moved to previous operand.  
if there is a previous operand (a prior operation) and another operation is clicked, then the evaluate function is called and the operation is determined and performed, then assigned to the previous operand variable to be displayed on the results screen.

afterward, any other digits clicked are added to current operand until = is clicked to evaluate or result is cleared