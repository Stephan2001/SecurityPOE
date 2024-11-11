
# Prime Vault

## Please note - follow setup guide
When trying to run these projects on your own local environment, you need to navigate to each folder and install dependencies.

For example:
```bash
cd backend
npm install
```

## Setup guide
For backend (Run this first, its used as a proxy for frontend on port 3000):
```bash
cd backend
npm install
```
For frontend:
```bash
cd frontend
npm install
```
For frontend2:
```bash
cd frontend2
npm install
```

Add .env file (backend):
![image](https://github.com/user-attachments/assets/73f864a4-81e8-4942-bd6c-a61fdc270a44)

Add .env file (frontend2):

![image](https://github.com/user-attachments/assets/5f91589a-1484-4714-9595-1d468b03f751)


You can use your own MongoDB cluster, as your IP will not be whitelisted.  
Contact me at `moolmans20013@gmail.com` or `st10219213@vcconnect.edu.za` to have your IP added to the whitelist if needed.  
I check the first email daily, but the latter not as frequently.

Furthermore, the unit tests run on a self-hosted machine, so they will only execute if my machine is active while running my workflow runner.

## YouTube Video Link
[Watch the demo video here](https://www.youtube.com/watch?v=NJ3uRB49eKU)

## Main Features Added:
* **CircleCI & SonarCube** integration
* **React Bootstrap**
* **Loading screens & animations**
* **CAPTCHA verifications**
* **Unit tests** with preconfigured account
* **SonarCube quality profile rules** (JavaScript) for detecting code smells and hardcoded secrets
* **Search option for payments** in the employee portal
* **SSL on backend and frontend**, with salted and encrypted passwords
* **Security tools**: HSTS, Helmet, Validator, bcrypt, csurf, fs, ExpressBrute (Backend)
