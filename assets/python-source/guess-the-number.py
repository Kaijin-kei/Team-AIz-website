### GAME TRIAL CODE ###
import random
random_number = random.randint(1,100)
guesses = 0
guess_answer = 0

def user_guess():
    guess = int(input("guess a number: "))
    return guess
    
guess_answer = user_guess()

while guess_answer != random_number:
    if guess_answer > random_number:
        print('go lower!!!')
        guesses += 1
        guess_answer = user_guess()
    elif guess_answer < random_number:
        print('higher')
        guesses += 1
        guess_answer = user_guess()
print('u got it in ' + str(guesses) + ' tries')
