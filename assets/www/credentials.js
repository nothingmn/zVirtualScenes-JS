var credentials = function() {

    if (!(this instanceof credentials)) {
        return new credentials();
    } 
	
	this.Host = 'http://HOST';
	this.Port = 8000;
	this.Password = 'password is this';
}
