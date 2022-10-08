
import os
import hashlib

while True:
    print("\n\n\nNew user")
    name = input("Full Name >> ")
    nameAdd = name.split(" ")[0][0]+name.split(" ")[1]
    print(f"Name Tag >> {nameAdd}")
    password = input("Password >> ")
    userDir = hashlib.md5((name+password).encode("utf-8")).hexdigest()
    if os.path.exists("users\\"+userDir):
        print(1/0)
    
    print("Adding to list")
    d = open("scripts.js","r").read().split("\n")
    d[1] = d[1][:-1]+f',"{nameAdd}"]'
    d[2] = d[2][:-1]+f',"{password}"]'
    d[3] = d[3][:-1]+f',"{userDir}"]'
    with open("scripts.js","w") as f:
        f.write('\n'.join(d))
    
    print("Creating directory")
    os.mkdir("users\\"+userDir)
    os.mkdir(f"users\\{userDir}\\emails")
    
    print("Populating")
    
    for file in ["index.html","style.css","emails\\style.css"]:
        with open(f"users\\{userDir}\\{file}","w") as f:
            d = open(f"default formats\\{file}").read()
            d = d.replace("%name%",name)
            d = d.replace("%nameAdd%",nameAdd)
            d = d.replace("%password%",password)
            d = d.replace("%userDir%",userDir)
            f.write(d)
    
    print("Generating Emails")
    
    emails = []
    while True:
        email = {}
        moreEmails = input("Create an email (y/n) >> ")
        if moreEmails[0].lower() == "n":
            break
        emailTitle = input("Email title >> ")
        email["emailTitle"]=emailTitle
        emailFrom = input("Email from (blank for self) >> ")
        if emailFrom=="":
            emailFrom = nameAdd+"@fakeemail.com"
        else:
            emailFrom = emailFrom+"@fakeemail.com"
        email["emailFrom"]=emailFrom
        emailTo = input("Email to (blank for self) >> ")
        if emailTo=="":
            emailTo = nameAdd+"@fakeemail.com"
        else:
            emailTo = emailTo+"@fakeemail.com"
        email["emailTo"]=emailTo
        attatchments = []
        addAttatchments = input("Add attatchments (y/n) >> ")
        if addAttatchments[0].lower() == "y":
            while True:
                attatchments.append(input("Enter file name >> "))
                addAttatchments = input("Add another (y/n) >> ")
                if addAttatchments[0].lower() == "n":
                    break
        email["attatchments"]=attatchments
        print("Please enter the body of the email below, enter 'end' to finish...")
        emailBody = []
        while True:
            emailData = input("")
            if emailData.lower()=="end":
                break
            else:
                emailBody.append(emailData)
        i=0
        for e in emailBody:
            emailBody[i]=f"<p>{e}</p>"
            i+=1
        emailBody = '\n'.join(emailBody)
        email["emailBody"]=emailBody
        emailId = hashlib.md5((emailTitle+emailFrom+emailTo+str(attatchments)+emailBody).encode("utf-8")).hexdigest()
        email["emailId"]=emailId
        emails.append(email)
        with open(f"users\\{userDir}\\emails\\{emailId}.html","w") as f:
            d = open(f"default formats\\emails\\email.html").read()
            d = d.replace("%emailTitle%",emailTitle)
            d = d.replace("%emailFrom%",emailFrom)
            d = d.replace("%emailTo%",emailTo)
            d = d.replace("%emailBody%",emailBody)
            if len(attatchments)==0:
                d = d.replace("%attatchments%","None")
            else:
                i=0
                for attatchment in attatchments:
                    attatchments[i] = f"<a href=\"attachments/{attatchment}\" download>{attatchment}</a> "
                    i+=1
                d = d.replace("%attatchments%",''.join(attatchments))
            f.write(d)
    
    print("Creating email.html")
    with open(f"users\\{userDir}\\email.html","w") as f:
        d = open(f"default formats\\email.html").read()
        emailInserts = []
        for email in emails:
            shortenedEmail = email["emailBody"].split('\n')[0]
            if len(shortenedEmail)>124:
                shortenedEmail=shortenedEmail[:124]+"..."
            if len(email["emailBody"].split('\n'))>0:
                shortenedEmail=shortenedEmail+"..."
            emailInserts.append(f"<a href=\"emails/{email['emailId']}.html\"><table><tr><th class=\"title\">{email['emailTitle']}</th></tr><tr><th class=\"body\">{shortenedEmail}</th></tr></table></a>")
        d = d.replace("%emails%",''.join(emailInserts))
        d = d.replace("%name%",name)
        d = d.replace("%nameAdd%",nameAdd)
        d = d.replace("%password%",password)
        d = d.replace("%userDir%",userDir)
        f.write(d)
    
    print(f"Completed creation of {name}")

