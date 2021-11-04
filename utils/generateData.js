const firstNames = ['Sophia', 'Emma', 'Olivia', 'Isabella', 'Ava', 'Mia', 'Emily', 'Abigail', 'Madison', 'Elizabeth', 'Charlotte', 'Avery', 'Sofia', 'Chloe', 'Ella', 'Harper', 'Amelia', 'Aubrey', 'Addison', 'Evelyn', 'Natalie', 'Grace', 'Hannah', 'Zoey', 'Victoria', 'Lillian', 'Lily', 'Brooklyn', 'Samantha', 'Layla', 'Zoe', 'Audrey', 'Leah', 'Allison', 'Anna', 'Aaliyah', 'Savannah', 'Gabriella', 'Camila', 'Aria', 'Noah', 'Liam', 'Jacob', 'Mason', 'William', 'Ethan', 'Michael', 'Alexander', 'Jayden', 'Daniel', 'Elijah', 'Aiden', 'James', 'Benjamin', 'Matthew', 'Jackson', 'Logan', 'David', 'Anthony', 'Joseph', 'Joshua', 'Andrew', 'Lucas', 'Gabriel', 'Samuel', 'Christopher', 'John', 'Dylan', 'Isaac', 'Ryan', 'Nathan', 'Carter', 'Caleb', 'Luke', 'Christian', 'Hunter', 'Henry', 'Owen', 'Landon', 'Jack'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson', 'Thompson', 'White', 'Lopez', 'Lee', 'Gonzalez', 'Harris', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Perez', 'Hall', 'Young', 'Allen', 'Sanchez', 'Wright', 'King', 'Scott', 'Green', 'Baker', 'Adams', 'Nelson', 'Hill', 'Ramirez', 'Campbell', 'Mitchell', 'Roberts', 'Carter', 'Phillips', 'Evans', 'Turner', 'Torres', 'Parker', 'Collins', 'Edwards', 'Stewart', 'Flores', 'Morris', 'Nguyen', 'Murphy', 'Rivera', 'Cook', 'Rogers', 'Morgan', 'Peterson', 'Cooper', 'Reed', 'Bailey', 'Bell', 'Gomez', 'Kelly', 'Howard', 'Ward', 'Cox', 'Diaz', 'Richardson', 'Wood', 'Watson', 'Brooks', 'Bennett', 'Gray', 'James', 'Reyes', 'Cruz', 'Hughes', 'Price', 'Myers', 'Long', 'Foster', 'Sanders', 'Ross', 'Morales', 'Powell', 'Sullivan', 'Russell', 'Ortiz', 'Jenkins', 'Gutierrez', 'Perry', 'Butler', 'Barnes', 'Fisher'];
const msOfYear = 365 * 24 * 60 * 60 * 1000;

const random = (max) => Math.round(Math.random() * 1000) % max;

let nextId = 1;

const generatePerson = function(index) {
    const firstName = firstNames[random(firstNames.length)];
    const lastName = lastNames[random(lastNames.length)];
    const birthday = new Date(+(new Date()) - Math.floor(Math.random()*10000000000)).toLocaleDateString();
		const email = (firstName.replace('-', '_') + '_' + lastName.replace('-', '_') + '@example.com').toLowerCase();
    
    return {
			id: nextId++,
			firstName,
			lastName,
			email,
			birthday
		};
};

export function generateData(count) {
	const data = new Array(count);

	for (let i = 0; i < count; i++) {
		data[i] = generatePerson(i);
	}
  
	return data;
}