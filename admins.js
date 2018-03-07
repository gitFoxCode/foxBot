var adminList = [{
		name: 'Sebastian Włudzik',
		id: '100001810636246',
		rank: 'admin'
	},
	{
		name: 'Sebastian Lis',
		id: '100008996418514',
		rank: 'admin'
	},
	{
		name: 'Sebastian Lis',
		id: '123',
		rank: 'admin'
	}];


function isAdmin(userId){
	for (let i = 0; i <= adminList.length -1; i++) {
		if(adminList[i].id == userId){
			return true;
			break;
		} 
	}
};


module.exports.adminList = adminList;
module.exports.isAdmin = isAdmin;
