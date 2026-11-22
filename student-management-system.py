students = []

import os

# ------------------------------------------
# CLEAR SCREEN 
# ------------------------------------------

def clear_screen():
    os.system("cls" if os.name == "nt" else "clear")
    
# ------------------------------------------
# START 
# ------------------------------------------

def start():
    print("\n=========================")
    print("[ Press ENTER to START ]")
    print("=========================")
    user_input = input("Click the button by pressing Enter (or type 'exit' to quit): ")
    if user_input.lower() == 'exit':
        print("Goodbye!")
    else:
        loading()
        main()
        

# ------------------------------------------
# LOADING BAR
# ------------------------------------------

def loading():
    
    import time

    print("Loading, please wait...")

    total_steps = 20

    for i in range(total_steps + 1):
        bar = "█" * i + "-" * (total_steps - i)
        percent = int((i / total_steps) * 100)

        print(f"\r[{bar}] {percent}%", end="", flush=True)
        time.sleep(0.4)
        
        
# ------------------------------------------
# CREATE
# ------------------------------------------
def add_student():
    print("\n===== ADD STUDENT =====")

    while True:
        student_id = input("Enter Student ID: ")
    
        if student_id == "":
            print("student_id must not be empty")
            continue
        
        for student in students:
            if student["id"] == student_id:
                print("Error: Student ID already exists.")
                continue
        break
    
    while True:
        name = input("Enter Student Name: ")
        if name == "":
            print('name must not be empty!')
        
        elif not all(char.isalpha() or char.isspace() for char in name):
            print('name must contain letters and spaces only!')
            
        else:
            break
    while True: 
        course = input("Enter Course: ")
        if course == "":
            print('course must not be empty!')
        else:
            break
    while True:
        year = int(input("Enter Year Level: "))
        if year == 1 or year == 2 or year == 3 or year == 4:
            break
        
        else:
            print('year must be 1 to 4 only')
    
    while True:
        try:
            GPA = float(input("Enter Gpa: "))
            if 0 <= GPA <= 6:
                break
        
            else:
                print(' GPA can only be 1 to 5!')
                
        except ValueError:
            print('please enter a valid number')
            
    while True:
        try:
            Lowest_Grade = float(input("Enter Lowest Grade: "))
            if 0 <= Lowest_Grade <= 6:
                break
        
            else:
                print(' GPA can only be 1 to 5!')
                
        except ValueError:
            print('please enter a valid number')
            
    while True:
        try:
            Highest_Grade = float(input("Enter Highest Grade: "))
            if 0 <= Highest_Grade <= 6:
                break
        
            else:
                print(' GPA can only be 1 to 5!')
                
            if Highest_Grade > Lowest_Grade:
                print('Highest_Grade must be higher in value than Lowest_Grade')
                
        except ValueError:
            print('please enter a valid number')
        
    student = {
        "id": student_id,
        "name": name,
        "course": course,
        "year": year,
        "gpa": GPA,
        "Highest_Grade": Highest_Grade,
        "Lowest_Grade": Lowest_Grade
    }

    students.append(student)

    print("Student added successfully!")


# ------------------------------------------
# READ - VIEW ALL
# ------------------------------------------
def view_students():
    print("\n===== STUDENT LIST =====")

    if len(students) == 0:
        print("No students found.")
        return

    print("-" * 70)
    print(f"{'ID':<15}{'NAME':<25}{'COURSE':<15}{'YEAR':<10}")
    print("-" * 70)

    for student in students:
        print(
            f"{student['id']:<15}"
            f"{student['name']:<25}"
            f"{student['course']:<15}"
            f"{student['year']:<10}"
        )

    print("-" * 70)
    student_id = input("Enter Student ID, (Type Y to return): ")
    for student in students:
        if student["id"] == student_id:
            print("-" * 70)
            print(f"{'GPA':<15}{'HIGHEST_GRADE':<25}{'LOWEST_GRADE':<15}")
            print("-" * 70)

            
            print(
            f"{student['gpa']:<15}"
            f"{student['Highest_Grade']:<15}"
            f"{student['Lowest_Grade']:<15}"
            )
            print("-" * 70)
            go_back = input ("return Type Y: ")
            if go_back == "Y":
                clear_screen()
                view_students()
            else:
                print("\n IMPROPER INPUT")
                break
        elif student_id == "Y":
            print("\n=== RETURN COMPLETE ===")
            clear_screen()
            main()
            
        else:
            print("\n ===WRONG INPUT===")
            print("\n ===PROGRAM TERMINATION===")
            break
         
           
    

# ------------------------------------------
# READ - SEARCH
# ------------------------------------------
def search_student():
    print("\n===== SEARCH STUDENT =====")

    student_id = input("Enter Student ID: ")

    for student in students:
        if student["id"] == student_id:
            print("\nStudent Found!")
            print("-" * 70)
            print(f"{'ID':<15}{'NAME':<25}{'COURSE':<15}{'YEAR':<10}")
            print("-" * 70)
            
            print(
            f"{student['id']:<15}"
            f"{student['name']:<25}"
            f"{student['course']:<15}"
            f"{student['year']:<10}"
            )
            print("-" * 70)
            
            student_id = input("Enter Student ID, (Type Y to return): ")
            for student in students:
                if student["id"] == student_id:
                    print("-" * 70)
                    print(f"{'GPA':<15}{'HIGHEST_GRADE':<25}{'LOWEST_GRADE':<15}")
                    print("-" * 70)

                    
                    print(
                    f"{student['gpa']:<15}"
                    f"{student['Highest_Grade']:<25}"
                    f"{student['Lowest_Grade']:<15}"
                    )
                    print("-" * 70)
                    go_back = input ("return Type Y: ")
                    if go_back == "Y":
                        clear_screen
                        search_student()
                    else:
                        print("\n IMPROPER INPUT")
                        break
                elif student["id"] == "Y":
                    print("\n=== RETURN COMPLETE ===")
                    clear_screen
                    main()
            
                else:
                    print("\n ===WRONG INPUT===")
                    print("\n ===PROGRAM TERMINATION===")
                    break
        else:
            print("Student not found.")


# ------------------------------------------
# UPDATE
# ------------------------------------------
def update_student():
    print("\n===== UPDATE STUDENT =====")

    student_id = input("Enter Student ID to update: ")

    for student in students:
        if student["id"] == student_id:

            print("\nCurrent Information:")
            print("Name          :", student["name"])
            print("Course        :", student["course"])
            print("Year Level    :", student["year"])
            print("GPA           :", student["gpa"])
            print("Highest_Grade :", student["Highest_Grade"])
            print("Lowest_Grade  :", student["Lowest_Grade"])
            
            print("\nEnter new information.")
            print("Press ENTER to keep the current value.")

            name = input("New Name: ")
            course = input("New Course: ")
            year = input("New Year Level: ")
            GPA = input("New Gpa: ")
            Highest_Grade = input("New Highest Grade: ")
            Lowest_Grade = input("New Lowest Grade: ")
                
            if name != "":
                student["name"] = name

            if course != "":
                student["course"] = course

            if year != "":
                student["year"] = year
                
            if name != "":
                student["GPA"] = GPA
                
            if name != "":
                student["Highest_Grade"] = Highest_Grade
                
            if name != "":
                student["Lowest_Grade"] = Lowest_Grade
                

            print("\nStudent updated successfully!")
            return

    print("Student not found.")


# ------------------------------------------
# DELETE
# ------------------------------------------
def delete_student():
    print("\n===== DELETE STUDENT =====")

    student_id = input("Enter Student ID to delete: ")

    for student in students:
        if student["id"] == student_id:

            print("\nStudent Found:")
            print("Name:", student["name"])

            confirm = input("Are you sure you want to delete? (Y/N): ")

            if confirm.upper() == "Y":
                students.remove(student)
                print("Student deleted successfully!")
            else:
                print("Delete operation cancelled.")

            return

    print("Student not found.")
    
# ------------------------------------------
# FILTER
# ------------------------------------------

def filter_students():
    print("\n===== FILTER STUDENTS =====")
    print("1. Filter by Course")
    print("2. Filter by Year Level")
    print("3. Filter by GPA")
    print("4. Return")

    choice = input("Enter your choice: ")

    if choice == "1":
        course = input("Enter Course: ")

        found = False
        print("\n===== FILTERED STUDENTS =====")
        print(f"{'ID':<15}{'NAME':<25}{'COURSE':<15}{'YEAR':<10}")
        print("-" * 70)

        for student in students:
            if student["course"].lower() == course.lower():
                print(
                    f"{student['id']:<15}"
                    f"{student['name']:<25}"
                    f"{student['course']:<15}"
                    f"{student['year']:<10}"
                )
                print("-" * 70)
                found = True
                back = input ("Type Y to exit: ")
                if back == "Y":
                    clear_screen()
                    main()
                    
        if not found:
            print("No students found for that course.")

    elif choice == "2":
        year = int(input("Enter Year Level: "))

        found = False
        print("\n===== FILTERED STUDENTS =====")
        print(f"{'ID':<15}{'NAME':<25}{'COURSE':<15}{'YEAR':<10}")
        print("-" * 70)

        for student in students:
            if student["year"] == year:
                print(
                    f"{student['id']:<15}"
                    f"{student['name']:<25}"
                    f"{student['course']:<15}"
                    f"{student['year']:<10}",
                )
                print("-" * 70)
                found = True
                back = input ("Type Y to exit: ")
                if back == "Y":
                    clear_screen()
                    main()
                    
        if not found:
            print("No students found for that year level.")

    elif choice == "3":
        try:
            minimum_gpa = float(input("Enter minimum GPA: "))

            found = False
            print("\n===== STUDENTS WITH GPA ABOVE MINIMUM =====")
            print(f"{'ID':<15}{'NAME':<25}{'GPA':<10}")
            print("-" * 50)

            for student in students:
                if float(student["gpa"]) >= minimum_gpa:
                    print(
                        f"{student['id']:<15}"
                        f"{student['name']:<25}"
                        f"{student['gpa']:<10}"
                    )
                    print("-" * 70)
                    found = True
                    back = input ("Type Y to exit: ")
                    if back == "Y":
                        clear_screen()
                        main()

            if not found:
                print("No students found with that GPA.")

        except ValueError:
            print("Invalid GPA. Please enter a number.")

    elif choice == "4":
        return

    else:
        print("Invalid choice.")


# ------------------------------------------
# MAIN MENU
# ------------------------------------------
def main():

    while True:

        print("\n")
        print("=" * 45)
        print("      STUDENT MANAGEMENT SYSTEM")
        print("=" * 45)

        print("1. Add Student")
        print("2. View Students")
        print("3. Search Student")
        print("4. Update Student")
        print("5. Delete Student")
        print("6. Filter Students")
        print("7. Exit")

        print("=" * 45)

        choice = input("Enter your choice: ")

        if choice == "1":
            add_student()
            clear_screen()
            
        elif choice == "2":
            clear_screen()
            view_students()

        elif choice == "3":
            clear_screen()
            search_student()

        elif choice == "4":
            clear_screen()
            update_student()

        elif choice == "5":
            clear_screen()
            delete_student()
            
        elif choice == "6":
            clear_screen()
            filter_students()

        elif choice == "7":
            print("\nThank you for using the system!")
            break

        else:
            print("Invalid choice. Please try again.")


# ------------------------------------------
# RUN PROGRAM
# ------------------------------------------
start()
