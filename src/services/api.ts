//Mocked service calls

export async function getAccounts() {
  try {
    const res = await fetch('/accounts.json');
    if (!res.ok) throw new Error('Failed to load accounts');
    const data = await res.json();
    return data;
  } catch {
    // fallback to src/data JSON copies for tests
    const data = await import('../data/accounts.json');
    return data.default || data;
  }
}

export async function getTransactions(accountNumber: string) {
  // map to file names in public/
  const fileMap: Record<string, string> = {
    'NL14ABNA4415260276': '/transactions_NL14ABNA4415260276.json',
    'NL18ABNA5476393838': '/transactions_NL18ABNA5476393838.json',
    'NL72ABNA4416709382': '/transactions_NL72ABNA4416709382.json'
  };
  const path = fileMap[accountNumber];
  if (!path) throw new Error('No transactions for account');
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Failed to load transactions');
    return res.json();
  } catch {
    // fallback to src/data JSON copies for tests
    const fileName = path.replace('/', '');
    const data = await import(`../data/${fileName}`);
    return data.default || data;
  }
}