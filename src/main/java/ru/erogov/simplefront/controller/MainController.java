package ru.erogov.simplefront.controller;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import ru.erogov.watty.api.Offer;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Controller
public class MainController {

    private static List<Offer> offers = new ArrayList<>();

    static {
        offers.add(new Offer("a123","qwerty", new BigDecimal(10.21)));
        offers.add(new Offer("b456","asdfgh", new BigDecimal(15.5)));
    }

    @Value("${welcome.message}")
    private String message;

    @RequestMapping(value = {"/","index"}, method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("message", message);
        model.addAttribute("offers", offers);
        System.out.println(new Gson().toJson(offers));
        return "index";
    }


}
