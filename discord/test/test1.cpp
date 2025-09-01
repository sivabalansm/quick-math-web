#include <dpp/dpp.h>

const std::string BOT_TOKEN = "";

int main() {
        dpp::cluster bot = dpp::cluster(BOT_TOKEN);


        bot.on_slashcommand([](const dpp::slashcommand_t &event){

                        if (event.command.get_command_name() == "ping") {
                                event.reply("Pong!!!");
                        }
        });
                
        bot.on_ready([&bot](const dpp::ready_t &event) {
                        if (dpp::run_once<struct register_bot_commands>()) {
                                bot.global_command_create(dpp::slashcommand("ping", "pong!", bot.me.id));
                        }
                        dpp::message msg = dpp::message(1066927523197370390, "Hey bombo");
                        bot.message_create(msg);
                        
        });

        bot.start(dpp::st_wait);
        return 0;
}
