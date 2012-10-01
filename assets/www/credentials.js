var credentials = function() {

    if (!(this instanceof credentials)) {
        return new credentials();
    } 
	
	this.Host = 'http://home';
	this.Port = 8030;
	this.Password = 'password';
}
