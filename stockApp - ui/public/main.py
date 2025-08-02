import json
from time import sleep

while True:
    print("[1] Create new account")
    print("[2] Login")
    print("[3] Forgot password")
    key = input("> ")

    if key == '1':
        register_request = {"action": "REGISTER"}
        print("\nRegistration")
        print("--------------------------")
        print("Fill out the fields below:")
        register_request["first_name"] = input("First Name: ")
        register_request["last_name"] = input("Last Name: ")
        register_request["username"] = input("Username: ")
        register_request["password"] = input("Password: ")

        with open("request.txt", "w") as file:
            json.dump(register_request, file, indent=4)
        print("Registering New User")
        for i in range(3):
            print('.')    
            sleep(1)
        # read JSON response from file
        with open("response.txt", "r") as file:
            response = json.load(file)
        if response["success"]:
            print("You have been successfully registered!")
            print(f"Here is your account recovery key in case you ever forget your password: {response['recovery_key']}")
        else:
            print(f"Error: {response['message']}")



    elif key == '2':
        login_request = {"action": "LOGIN"}
        print("\nLogin")
        print("--------------------------")
        print("Fill out the fields below:")
        login_request["username"] = input("Username: ")
        login_request["password"] = input("Password: ")

        with open("request.txt", "w") as file:
            json.dump(login_request, file, indent=4)
        print("Logging In")
        for i in range(3):
            print('.')    
            sleep(1)
        # read JSON response from file
        with open("response.txt", "r") as file:
            response = json.load(file)
        if response["success"]:
            print("Successfully logged in")
        else:
            print(f"Error: {response['message']}")


    elif key == '3':
        recover_request = {"action": "RECOVER"}
        print("\nPassword Reset")
        print("--------------------------")
        print("Fill out the fields below:")
        recover_request["username"] = input("Username: ")
        recover_request["new_password"] = input("New Password: ")
        recover_request["recovery_key"] = input("Recovery Key: ")

        with open("request.txt", "w") as file:
            json.dump(recover_request, file, indent=4)
        print("Resetting Password")
        for i in range(3):
            print('.')    
            sleep(1)
        # read JSON response from file
        with open("response.txt", "r") as file:
            response = json.load(file)
        if response["success"]:
            print("Successfully reset password")
        else:
            print(f"Error: {response['message']}")

    elif key == 'q':
        break

