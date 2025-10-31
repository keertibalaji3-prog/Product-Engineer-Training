using Microsoft.AspNetCore.Mvc;
using OnlineOrderingAPI.DataAccess;
using OnlineOrderingAPI.Models;

namespace OnlineOrderingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly OrderDAL _orderDAL;

        public OrdersController(IConfiguration configuration)
        {
            _orderDAL = new OrderDAL(configuration);
        }

        [HttpGet]
        public IActionResult GetAllOrders()
        {
            var orders = _orderDAL.GetAllOrders();
            return Ok(orders);
        }

        [HttpGet("{id}")]
        public IActionResult GetOrderById(int id)
        {
            var order = _orderDAL.GetOrderById(id);
            if (order == null)
                return NotFound();
            return Ok(order);
        }

        [HttpPost]
        public IActionResult AddOrder([FromBody] OrderModel order)
        {
            _orderDAL.AddOrder(order);
            return Ok("Order added successfully");
        }

        [HttpPut("{id}")]
        public IActionResult UpdateOrder(int id, [FromBody] OrderModel order)
        {
            order.OrderID = id;
            _orderDAL.UpdateOrder(order);
            return Ok("Order updated successfully");
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            _orderDAL.DeleteOrder(id);
            return Ok("Order deleted successfully");
        }
    }
}

