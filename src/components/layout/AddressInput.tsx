export default function AddressFunction({addressProps, setAddressProps}:{addressProps: any, setAddressProps: any}) {
    const {phone, streetAddress, postalCode, city, country} = addressProps;
    return (
    <>
      <label>Telephone</label>
      <input
        type="tel"
        value={phone}
        onChange={(ev) => setAddressProps('phone', ev.target.value)}
        placeholder="Phone number"
      ></input>
      <label>Street address</label>
      <input
        type="text"
        value={streetAddress}
        onChange={(ev) => setAddressProps('streetAddress',ev.target.value)}
        placeholder="Street address"
      ></input>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>City</label>
          <input
            type="text"
            value={city}
            onChange={(ev) => setAddressProps('city',ev.target.value)}
            placeholder="City"
          ></input>
        </div>
        <div>
          <label>Postal code</label>
          <input
            type="text"
            value={postalCode}
            onChange={(ev) => setAddressProps('postalCode',ev.target.value)}
            placeholder="Postal code"
          ></input>
        </div>
      </div>
      <label>Country</label>
      <input
        type="text"
        value={country}
        onChange={(ev) => setAddressProps('country',ev.target.value)}
        placeholder="Country"
      ></input>
    </>
  );
}
