export default function AddressFunction({addressProps, setAddressProps, disabled=false}:{addressProps: any, setAddressProps: any, disabled:boolean}) {
    const {phone, streetAddress, postalCode, city, country} = addressProps;
    return (
    <>
      <label>Telephone</label>
      <input
        disabled={disabled}
        type="tel"
        value={phone || ''}
        onChange={(ev) => setAddressProps('phone', ev.target.value)}
        placeholder="Phone number"
      ></input>
      <label>Street address</label>
      <input
        type="text"
        disabled={disabled}
        value={streetAddress || ''}
        onChange={(ev) => setAddressProps('streetAddress',ev.target.value)}
        placeholder="Street address"
      ></input>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>City</label>
          <input
            type="text"
            disabled={disabled}
            value={city || ''}
            onChange={(ev) => setAddressProps('city',ev.target.value)}
            placeholder="City"
          ></input>
        </div>
        <div>
          <label>Postal code</label>
          <input
            type="text"
            disabled={disabled}
            value={postalCode || ''}
            onChange={(ev) => setAddressProps('postalCode',ev.target.value)}
            placeholder="Postal code"
          ></input>
        </div>
      </div>
      <label>Country</label>
      <input
        type="text"
        disabled={disabled}
        value={country || ''}
        onChange={(ev) => setAddressProps('country',ev.target.value)}
        placeholder="Country"
      ></input>
    </>
  );
}
