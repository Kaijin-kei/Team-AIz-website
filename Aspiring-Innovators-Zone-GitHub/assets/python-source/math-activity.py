class function:
    def display(self):
        print("\n--- FUNCTION ---")
        print("if f(x) = 2 then answer the given, 2x^2 + 3x - 1")
    
class sequence:
    def display(self):
        print("\n--- SEQUENCE ---")
        print("complete the sequence 3, 6, 9, _")
        
class sets:
    def display(self):
        print("\n--- SETS ---")
        print("what is the name of this set? (0, 1, 2, 3, 4, 5, ...)")
        
function = function()
sequence = sequence()
sets = sets()

while True:
    print("\n=== MATH ACTIVITY ===")
    print("1. Function")
    print("2. Sequence")
    print("3. Sets")
    print("4. Exit")
    
    choice = input("choose ur hell (1-3):")
    
    if choice == "1":
        function.display()
        
        choice = input("Answer: ")
        if choice == "13":
            print("\ncorrect answer")
            break
        else:
            choice = input("wrong, try again: ")
            if choice == "13":
                print("\ncorrect answer")
                break
            else:
                choice = input("wrong, try again: ")
                if choice == "13":
                    print("\ncorrect answer")
                    break
                else:
                    print("just stop it, u stoopid")
                    break
                
    elif choice == "2":
        sequence.display()
        
        choice = input("Answer: ")
        if choice == "12":
            print("\ncorrect answer")
            break
        else:
            choice = input("wrong, try again: ")
            if choice == "12":
                print("\ncorrect answer")
                break
            else:
                choice = input("wrong, try again: ")
                if choice == "12":
                    print("\ncorrect answer")
                    break
                else:
                    print("just stop it, u stoopid")
                    break
                
    elif choice == "3":
        sets.display()
        
        choice = input("Answer: ")
        if choice == "W set":
            print("\ncorrect answer")
            break
        else:
            choice = input("wrong, try again: ")
            if choice == "W set":
                print("\ncorrect answer")
                break
            else:
                choice = input("wrong, try again: ")
                if choice == "W set":
                    print("\ncorrect answer")
                    break
                else:
                    print("just stop it, u stoopid")
                    break    
    
    elif choice == "4":  
        print("Succesfully Exited")
        break
    
    else:
        print("the hell u doin???, THE INSTRUCTION SAID CHOOSE 1-4 SO WHY DID U NOT FOLLOW IT????")
        break
