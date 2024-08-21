Step 1: Generate a New Private Key and CSR
    Generate a New Private Key:

    Open your terminal.
        Run the following command to create a new private key:
        bash : openssl genpkey -algorithm RSA -out mydomain.key -pkeyopt rsa_keygen_bits:2048

        This will create a new private key file named mydomain.key.

    Create a Certificate Signing Request (CSR):
        Run the following command to create a CSR:
        bash : openssl req -new -key mydomain.key -out mydomain.csr

        You will be prompted to enter several pieces of information. Ensure that the Common Name (CN) matches the domain name of your application (ex www.105.193.30.34.com <- Kyle's Computer Cert)

    Step 2: Generate the Certificate
        You have two options here: create a self-signed certificate or obtain a certificate from a Certificate Authority (CA).

        Option 1: Self-Signed Certificate
            Generate a Self-Signed Certificate:
            Run the following command:
            bash : openssl x509 -req -days 365 -in mydomain.csr -signkey mydomain.key -out mydomain.crt

            This will create a self-signed certificate mydomain.crt valid for 365 days.