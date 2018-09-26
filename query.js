function getAccount() {

    // Get input
    const accountName = document.getElementById('accountName').value;

    Eos({
            // Pass in configuration info for main chain
            httpEndpoint: 'http://dev.cryptolions.io:38888',
            chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
        })

        .getAccount(accountName)

        .then((account) => {

            // Render account info, remove error message (allows 'real-time search')
            document.getElementById('error').style.display = 'none';
            document.getElementById('container').style.display = 'block';

            // Query and display account info
            document.getElementById('account').innerHTML = account.account_name;

            // Note 'EOS' is already appended to core balances
            document.getElementById('available').innerHTML = account.core_liquid_balance;
            document.getElementById('staked').innerHTML = account.voter_info.staked / 10000 + ' EOS';
            document.getElementById('cpu').innerHTML = `${account.cpu_limit.used / 1000} of ${account.cpu_limit.max / 1000} ms`;
            document.getElementById('network').innerHTML = `${account.net_limit.used / 1000} of ${account.net_limit.max / 1000} KB`;
            document.getElementById('ram').innerHTML = `${account.ram_usage / 1000} of ${account.ram_quota / 1000} KB`;

        })

        .catch(e => {

            // If account name invalid, hide previous account info and display error message (allows 'real-time search')
            document.getElementById('container').style.display = 'none'
            document.getElementById('error').style.display = 'block';

        });

}
