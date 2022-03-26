const assert = require('assert')
const anchor = require('@project-serum/anchor')
const {SystemProgram} = anchor.web3
describe('my_calculator_dapp', () => {
    const provider = anchor.Provider.local();
    anchor.setProvider(provider)
    const calculator = anchor.web3.Keypair.generate()
    const program = anchor.workspace.my_calculator_dapp

    //Calculator Creation Test
    it('Creates a calculator', async() => {
        await program.rpc.create("Welcome Youngin' to Solana!", {
            accounts: {
                calculator: calculator.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programid
            },
            signers: [calculator]
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.greeting === "Welcome Youngin' to Solana")
    })

    //Addition Operation Test
    it('Adds Two Numbers', async() => {
        await program.rpc.add(new anchor.BN(3), new anchor.BN(3), {
            accounts: {
                calculator: calculator.publicKey
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result.eq(new anchor.BN(6)))
    })

    // Subtraction Operation Test
    it('Subtracting Two Numbers', async() => {
        await program.rpc.add(new anchor.BN(3), new anchor.BN(3), {
            accounts: {
                calculator: calculator.publicKey
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result.eq(new anchor.BN(0)))
    })

    // Multiplication Operation Test
    it('Multiplying Two Numbers', async() => {
        await program.rpc.add(new anchor.BN(3), new anchor.BN(3), {
            accounts: {
                calculator: calculator.publicKey
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result.eq(new anchor.BN(9)))
    })

    // Dividing Operation Test
    it('Dividing Two Numbers', async() => {
        await program.rpc.add(new anchor.BN(10), new anchor.BN(3), {
            accounts: {
                calculator: calculator.publicKey
            }
        });
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result.eq(new anchor.BN(3)));
        assert.ok(account.remainder.eq(new anchor.BN(1)));
    })

})