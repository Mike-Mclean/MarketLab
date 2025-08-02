import json
import random
from time import sleep

# Character Limits (inclusive)
# ----------------------------

# set these to whatever you like, or handle them in your main program if you prefer.
NAME_MIN = 1
NAME_MAX = 35
USERNAME_MIN = 6
USERNAME_MAX = 16
PASSWORD_MIN = 8
PASSWORD_MAX = 64

# Length of generated recovery keys. Adjust to make recovery keys be longer/shorter if you like.
RECOVERY_KEY_LENGTH = 10



def clear_file(file_path):
    with open(file_path, 'w') as file:
        # open the file in write mode to clear its contents
        pass

def register(req, res):
    # check character limits
    if len(req["first_name"]) < NAME_MIN or len(req["first_name"]) > NAME_MAX:
        res["success"] = False
        res["message"] = f"First name must be between {NAME_MIN} and {NAME_MAX} characters."
        return
    
    if len(req["last_name"]) < NAME_MIN or len(req["last_name"]) > NAME_MAX:
        res["success"] = False
        res["message"] = f"Last name must be between {NAME_MIN} and {NAME_MAX} characters."
        return
    
    if len(req["username"]) < USERNAME_MIN or len(req["username"]) > USERNAME_MAX:
        res["success"] = False
        res["message"] = f"Username must be between {USERNAME_MIN} and {USERNAME_MAX} characters."
        return
    
    if len(req["password"]) < PASSWORD_MIN or len(req["password"]) > PASSWORD_MAX:
        res["success"] = False
        res["message"] = f"Password must be between {PASSWORD_MIN} and {PASSWORD_MAX} characters."
        return

    # open database for appending and reading
    with open("database.txt", "r") as file:
        try:
            # read existing data from database
            database = json.load(file)
        except:
            # if there are no users in the database, start with an empty list
            database = []

    # check if username is already taken
    if any(user["username"].upper() == req["username"].upper() for user in database):
        res["success"] = False
        res["message"] = f"Username '{req['username']}' is unavailable."
        return

    else:
        # generate a recovery key
        recovery_key = str(random.randint(RECOVERY_KEY_LENGTH**9, RECOVERY_KEY_LENGTH**10 - 1))

        # add user to database
        new_user = {
            "first_name":   req["first_name"],
            "last_name":    req["last_name"],
            "username":     req["username"],
            "password":     req["password"],
            "recovery_key": recovery_key
        }
        database.append(new_user)
        with open("database.txt", "w") as file:
            json.dump(database, file, indent=4)

        # generate response
        res["success"] = True
        res["message"] = f"Successfully registered user '{req['username']}'. A recovery key has been generated."
        res["recovery_key"] = recovery_key
        return

def login(req, res):
    # check character limits
    if len(req["username"]) < USERNAME_MIN or len(req["username"]) > USERNAME_MAX:
        res["success"] = False
        res["message"] = f"Username must be between {USERNAME_MIN} and {USERNAME_MAX} characters."
        return
    
    if len(req["password"]) < PASSWORD_MIN or len(req["password"]) > PASSWORD_MAX:
        res["success"] = False
        res["message"] = f"Password must be between {PASSWORD_MIN} and {PASSWORD_MAX} characters."
        return

    # open database for reading
    with open("database.txt", "r") as file:
        try:
            database = json.load(file)
        except:
            res["success"] = False
            res["message"] = "There are no users in the database."
            return
    
    for user in database:
        if user["username"].upper() == req["username"].upper():
            # check if password is correct
            if user["password"] == req["password"]:
                res["success"] = True
                res["message"] = f"User '{req['username']}' logged in successfully"
                return
            else:
                res["success"] = False
                res["message"] = "Incorrect Password"
                return
    # username not in database
    res["success"] = False
    res["message"] = f"User '{req['username']}' not found in database."
    return 

def recover(req, res):
    # check character limit
    if len(req["username"]) < USERNAME_MIN or len(req["username"]) > USERNAME_MAX:
        res["success"] = False
        res["message"] = f"Username must be between {USERNAME_MIN} and {USERNAME_MAX} characters."
        return

    if len(req["new_password"]) < PASSWORD_MIN or len(req["new_password"]) > PASSWORD_MAX:
        res["success"] = False
        res["message"] = f"Password must be between {PASSWORD_MIN} and {PASSWORD_MAX} characters."
        return

    with open("database.txt", "r") as file:
        try:
            database = json.load(file)
        except:
            res["success"] = False
            res["message"] = "There are no users in the database."
            return

    for user in database:
        if user["username"].upper() == req["username"].upper():
            # check if recovery key is correct
            if user["recovery_key"] == req["recovery_key"]:
                # update user password
                user["password"] = req["new_password"]
                with open("database.txt", "w") as file:
                    json.dump(database, file, indent=4)
                
                res["success"] = True
                res["message"] = f"Password successfully changed."
                return
            else:
                res["success"] = False
                res["message"] = f"Recovery key for user '{req['username']}' is incorrect."
                return
    # username not in database
    res["success"] = False
    res["message"] = f"User '{req['username']}' not found in database."
    return

while True:
    response = {}
    
    with open("request.txt", "r") as file:
        try:
            request = json.load(file)
            sleep(2)
            clear_file("request.txt")
        except:
            request = { "action" : None }

        if request["action"] == "REGISTER":
            register(request, response)
            with open("response.txt", "w") as file:
                json.dump(response, file, indent=4)

        elif request["action"] == "LOGIN":
            login(request, response)
            with open("response.txt", "w") as file:
                json.dump(response, file, indent=4)

        elif request["action"] == "RECOVER":
            recover(request, response)
            with open("response.txt", "w") as file:
                json.dump(response, file, indent=4)

