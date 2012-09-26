var credentials = function() {

    if (!(this instanceof credentials)) {
        return new credentials();
    } 
	
	this.Host = 'HOST';
	this.Port = 1111;
	this.Password = 'PASSWORD';
}
