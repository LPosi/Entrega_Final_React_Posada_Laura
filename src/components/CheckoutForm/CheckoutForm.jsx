import { createOrder } from "../../firebase/services";

const CheckoutForm = () => {
  const { cart, getTotal, clearCart } = useCart();
  const [orderId, setOrderId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      buyer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },
      items: cart,
      total: getTotal(),
      date: new Date(),
    };

    try {
      const id = await createOrder(order);
      setOrderId(id);
      clearCart();
    } catch (error) {
      console.error(error);
    }
  };

  if (orderId) {
    return (
      <div>
        <h2>¡Compra realizada!</h2>
        <p>Tu número de orden es: {orderId}</p>
      </div>
    );
  }

  return <form onSubmit={handleSubmit}>{/* Formulario de compra */}</form>;
};
