#include <dpp/dpp.h>

int main() {
    // If you need message content elsewhere, add i_message_content
    dpp::cluster bot(
        "token",
        dpp::i_default_intents | dpp::i_guilds
    );

    // Print DPP logs to stdout
    bot.on_log(dpp::utility::cout_logger());

    bot.on_slashcommand([](const dpp::slashcommand_t& event) {
        if (event.command.get_command_name() == "ping") {
            event.reply("Pong!");
        }
    });

    bot.on_ready([&bot](const dpp::ready_t& /*event*/) {
        if (dpp::run_once<struct register_bot_commands>()) {
            bot.global_command_create(
                dpp::slashcommand("ping", "Ping pong!", bot.me.id)
            );
        }
    });

    bot.start(dpp::st_wait);
    return 0;
}

