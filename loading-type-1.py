import time

print("Starting process...")

# Length of the loading animation
total_steps = 5

for i in range(total_steps):
  # '\r' moves the cursor back to the start of the line
  dots = "." * (i + 1)
  print(f"\rLoading{dots:<5}", end="")
  time.sleep(1)

print("\nDone! Welcome!")

