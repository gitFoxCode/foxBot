var adminList = [{
		name: 'Sebastian Włudzik',
		id: '100001810636246',
		rank: 'admin'
	},
	{
		name: 'Weronika Czerwińska',
		id: '100004072840517',
		rank: 'admin'
	},
	{
		name: 'Sebastian Lis',
		id: '100008996418514',
		rank: 'admin'
	},
	{
		name: 'Kuba Niewiadomski',
		id: '100006437376638',
		rank: 'admin'
	}];

var eventerList = [{
		name: 'Damian Wąchała',
		id: '100018200115337',
		rank: 'eventer'
	},
	{
		name: 'Dawid Kot',
		id: '100003681771195',
		rank: 'eventer'
	}
];


function isAdmin(userId){
	for (let i = 0; i <= adminList.length -1; i++) {
		if(adminList[i].id == userId){
			return true;
			break;
		} 
	}
};
function isEventer(userId){
	for (let i = 0; i <= eventerList.length -1; i++) {
		if(eventerList[i].id == userId){
			return true;
			break;
		} 
	}
};

module.exports.adminList = adminList;
module.exports.isAdmin = isAdmin;
module.exports.isEventer = isEventer;
