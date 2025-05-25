# Cash Register System

A Node.js application that manages a cash register system, handling currency denominations and change calculations in real-time.

## Features

- Real-time change calculation
- Database management for currency denominations
- Support for Brazilian currency (BRL)
- Automatic currency distribution for change
- Error handling for insufficient funds
- Interactive command-line interface

## Supported Currency Denominations

- Coins: R$ 0.05, R$ 0.10, R$ 0.25, R$ 0.50, R$ 1.00, R$ 2.00
- Bills: R$ 5.00, R$ 10.00, R$ 20.00, R$ 50.00, R$ 100.00, R$ 200.00

## Prerequisites

- Node.js (v18 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd [repository-name]
```

2. Install dependencies:
```bash
npm install
```

## Usage

1. Start the application:
```bash
npm start
```

2. Follow the menu options:
   - Option 1: Update currency quantities
   - Option 2: Recreate database
   - Option 3: Delete database
   - Option 4: Calculate change
   - Option 5: Exit

## How It Works

1. **Database Initialization**
   - Creates a SQLite database
   - Initializes currency table with all denominations
   - Sets initial quantities to zero

2. **Currency Management**
   - Add or update quantities of each denomination
   - View available currency
   - Automatic quantity updates after transactions

3. **Change Calculation**
   - Input total bill amount
   - Input payment amount
   - System calculates optimal change distribution
   - Updates currency quantities automatically

## Error Handling

- Validates numeric inputs
- Checks for sufficient payment
- Verifies available currency for change
- Handles database errors
- Prevents negative quantities

## Project Structure

```
src/
├── controllers/
│   └── app.js           # Main application logic
├── models/
│   └── dataManipulation.js  # Database operations
└── views/               # (Future UI implementations)
```

## Dependencies

- `prompt-sync`: For command-line user input
- `sqlite3`: For database management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

