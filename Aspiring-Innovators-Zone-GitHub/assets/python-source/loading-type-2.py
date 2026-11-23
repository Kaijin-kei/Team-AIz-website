def loading():
    
    import time

    print("Loading, please wait...")

    total_steps = 20

    for i in range(total_steps + 1):
        bar = "█" * i + "-" * (total_steps - i)
        percent = int((i / total_steps) * 100)

        print(f"\r[{bar}] {percent}%", end="", flush=True)
        time.sleep(0.50)
        
loading()
